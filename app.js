const KEY = "dukaansnap_v1";
const $ = id => document.getElementById(id);
const defaultData = {shop:{name:"My Little Store",description:"Handpicked products, just for you.",whatsapp:""},products:[]};
let data = loadData();
let isUrdu = false;

function loadData(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(defaultData)}catch{return structuredClone(defaultData)}}
function saveData(){localStorage.setItem(KEY,JSON.stringify(data));render()}
function money(n){return "Rs. "+Number(n||0).toLocaleString("en-PK")}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function escapeHTML(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function waLink(product){const phone=(data.shop.whatsapp||"").replace(/\D/g,"");const msg=`Assalam-o-alaikum, I want to order: ${product.name} (${money(product.price)}).`;return phone?`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`:`https://wa.me/?text=${encodeURIComponent(msg)}`}
function render(){
 $("storeTitle").textContent=data.shop.name||"My Store";
 $("storeDescription").textContent=data.shop.description||"";
 $("productCount").textContent=`${data.products.length} products`;
 $("shopName").value=data.shop.name||"";
 $("shopDesc").value=data.shop.description||"";
 $("whatsapp").value=data.shop.whatsapp||"";
 $("emptyState").hidden=data.products.length>0;
 $("productGrid").innerHTML=data.products.map(p=>`<article class="product-card">
 ${p.image?`<img src="${p.image}" alt="${escapeHTML(p.name)}">`:`<div class="product-placeholder">🛍️</div>`}
 <div class="product-info"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description||"")}</p>
 <div class="product-bottom"><span class="price">${money(p.price)}</span><a class="order-link" href="${waLink(p)}" target="_blank" rel="noopener">Order on WhatsApp</a></div>
 <button class="danger-btn remove-product" data-id="${p.id}" style="margin-top:12px;padding:7px 10px;font-size:11px">Remove</button></div></article>`).join("");
 document.querySelectorAll(".remove-product").forEach(btn=>btn.addEventListener("click",()=>{data.products=data.products.filter(p=>p.id!==btn.dataset.id);saveData();toast("Product removed")}));
}
$("shopForm").addEventListener("submit",e=>{e.preventDefault();data.shop={name:$("shopName").value.trim(),description:$("shopDesc").value.trim(),whatsapp:$("whatsapp").value.trim()};saveData();toast("Shop details saved")});
$("productForm").addEventListener("submit",async e=>{
 e.preventDefault();if(data.products.length>=5){toast("Demo limit reached: 5 products");return}
 const file=$("productImage").files[0];let image="";
 if(file){if(file.size>900000){toast("Please choose an image under 900 KB");return}image=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
 data.products.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:$("productName").value.trim(),price:Number($("productPrice").value),description:$("productDesc").value.trim(),image});
 try{saveData();$("productForm").reset();toast("Product added")}catch(err){data.products.pop();toast("Browser storage is full. Try a smaller photo.")}
});
$("printBtn").addEventListener("click",()=>window.print());
$("invoiceBtn").addEventListener("click",()=>{$("invoicePanel").hidden=!$("invoicePanel").hidden;$("invoicePanel").scrollIntoView({behavior:"smooth",block:"nearest"})});
$("makeInvoice").addEventListener("click",()=>{
 const name=$("customerName").value.trim()||"Customer";const item=$("invoiceItem").value.trim()||"Product";const amount=Number($("invoiceAmount").value);
 if(!amount||amount<0){toast("Enter a valid amount");return}
 $("invoiceOutput").innerHTML=`<div class="receipt"><h4>${escapeHTML(data.shop.name||"DukaanSnap")}</h4><p>Invoice · ${new Date().toLocaleDateString()}</p><p>Customer: ${escapeHTML(name)}</p><hr><p>${escapeHTML(item)}</p><div class="receipt-total">Total: ${money(amount)}</div><button class="secondary-btn" onclick="window.print()">Print invoice</button></div>`;
});
$("resetBtn").addEventListener("click",()=>{if(confirm("Delete all demo shop data from this browser?")){data=structuredClone(defaultData);saveData();toast("Demo data reset")}});
$("langBtn").addEventListener("click",()=>{isUrdu=!isUrdu;document.body.classList.toggle("urdu",isUrdu);$("langBtn").textContent=isUrdu?"English":"اردو";document.querySelectorAll("[data-en]").forEach(el=>el.textContent=isUrdu?el.dataset.ur:el.dataset.en)});
$("year").textContent=new Date().getFullYear();
render();