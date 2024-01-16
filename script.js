const countryList = {
  AED: "AE",AFN: "AF",XCD: "AG",ALL: "AL", AMD: "AM",ANG: "AN",AOA: "AO",AQD: "AQ",ARS: "AR",AUD: "AU",AZN: "AZ",BAM: "BA",BBD: "BB",
  BDT: "BD",XOF: "BE", BGN: "BG",BHD: "BH",BIF: "BI",BMD: "BM",BND: "BN",BOB: "BO",BRL: "BR",BSD: "BS",NOK: "BV",  BWP: "BW",  BYR: "BY",  BZD: "BZ",  CAD: "CA",
  CDF: "CD",XAF: "CF",CHF: "CH",CLP: "CL",CNY: "CN",COP: "CO",CRC: "CR",CUP: "CU",CVE: "CV",CYP: "CY",CZK: "CZ",DJF: "DJ",DKK: "DK",DOP: "DO",DZD: "DZ",ECS: "EC",EEK: "EE",EGP: "EG",ETB: "ET",EUR: "FR",FJD: "FJ",FKP: "FK",GBP: "GB",GEL: "GE",GGP: "GG",GHS: "GH",
  GIP: "GI",GMD: "GM",GNF: "GN",GTQ: "GT",GYD: "GY",HKD: "HK",HNL: "HN",HRK: "HR",HTG: "HT",HUF: "HU",IDR: "ID",ILS: "IL",INR: "IN",IQD: "IQ",IRR: "IR",ISK: "IS",JMD: "JM",JOD: "JO",JPY: "JP",KES: "KE",KGS: "KG",KHR: "KH",KMF: "KM",KPW: "KP",
  KRW: "KR",KWD: "KW",KYD: "KY",KZT: "KZ",LAK: "LA",LBP: "LB",LKR: "LK",LRD: "LR",LSL: "LS",LTL: "LT",LVL: "LV",LYD: "LY",MAD: "MA",MDL: "MD",MGA: "MG",MKD: "MK",MMK: "MM",MNT: "MN",MOP: "MO",MRO: "MR",MTL: "MT",MUR: "MU",MVR: "MV",MWK: "MW",MXN: "MX",MYR: "MY",MZN: "MZ",NAD: "NA",XPF: "NC",
  NGN: "NG",NIO: "NI",NPR: "NP",NZD: "NZ",OMR: "OM",PAB: "PA",PEN: "PE",PGK: "PG",PHP: "PH",PKR: "PK",PLN: "PL",PYG: "PY",QAR: "QA",RON: "RO",RSD: "RS",RUB: "RU",RWF: "RW",SAR: "SA",SBD: "SB",SCR: "SC",SDG: "SD",SEK: "SE",SGD: "SG",SKK: "SK",SLL: "SL",SOS: "SO",SRD: "SR",STD: "ST",SVC: "SV",SYP: "SY",SZL: "SZ",THB: "TH",TJS: "TJ",
  TMT: "TM",TND: "TN",TOP: "TO",TRY: "TR",TTD: "TT",TWD: "TW",TZS: "TZ",UAH: "UA",UGX: "UG",USD: "US",UYU: "UY",UZS: "UZ",
  VEF: "VE",VND: "VN",VUV: "VU",YER: "YE",ZAR: "ZA",ZMK: "ZM",ZWD: "ZW",
};
let baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".cntry-selec select");
const btn=document.querySelector("#btn");
const fromcurr = document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg = document.querySelector(".some-info")

for(let select of dropdown ){
  for(currcode in countryList){
    let newoption = document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name ==="from" && currcode==="USD"){
      newoption.selected="selected";
    }
   if(select.name ==="To" && currcode==="INR"){
      newoption.selected="selected";
    }
    select.append(newoption);
  }
  
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
  });
}

const updateflag=(element)=>{
  let currcode=element.value;
  let countrycode=countryList[currcode];
  let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsrc;
};


  const updateExchangeRate =async()=>{
  let amount = document .querySelector(".getinput input");
  let amtVal = amount.value;
  if(amtVal===" "||amtVal<1){
    amtVal=1;
    amount.value="1";
  }
   const URL =`${baseUrl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
     
let response = await fetch(URL);
let data =await response.json();
 let rate =data[tocurr.value.toLowerCase()];
 
 let finalAmount = amtVal*rate;
    msg.innerText =`${amtVal}${fromcurr.value}=${finalAmount}${tocurr.value}`;
  };
btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load",()=>{
  updateExchangeRate();
});
    
