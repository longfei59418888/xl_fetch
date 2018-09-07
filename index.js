import fetch from"isomorphic-fetch";let initData={URL:null,fetchBefore:null,success:null,error:null};export const init=data=>{Object.assign(initData,data)};export const get=async(url,options)=>{options.method="get";let body="";for(let item in options.data)body.length>0?body+="&":body+="?",body+=`${item}=${options.data[item]}`;return options.body=body,await fetchData(url,options)};export const post=async(url,options)=>(options.method="post",await fetchData(url,options));export const put=async(url,options)=>(options.method="put",await fetchData(url,options));export const del=async(url,options)=>(options.method="delete",await fetchData(url,options));export const upload=async(url,body)=>await fetch(initData.URL+url,{method:"POST",credentials:"include",body:body}).then(rst=>rst.json()).then(resData=>dealRst(resData,{})).catch(function(err){console.log("catch fetch:"+err)});async function fetchData(url,options){"get"!=options.method?options.body=JSON.stringify(options.data?options.data:{}):(url+=options.body,delete options.body),/^https:\/\/|^http:\/\//.test(url)||(url=initData.URL+url);let opts=Object.assign({loading:!0,data:{},url:url,deal:!0,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},mode:"cors"},options);return before(opts),await fetch(opts.url,opts).then(rst=>rst.json()).then(resData=>opts.deal?dealRst(resData,opts):resData).catch(function(err){console.log("catch fetch:"+err),opts.error?opts.error(err):initData.error&&initData.error(err)})}function before(opts){return opts.fetchBefore?opts.fetchBefore(opts):initData.fetchBefore?initData.fetchBefore(opts):opts}function dealRst(resData,opts){return opts.success?opts.success(resData,opts):initData.success?initData.success(resData,opts):resData}