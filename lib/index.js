import fetch from 'isomorphic-fetch';

let initData = {
    URL:null,
    fetchBefore:null,
    success:null,
    error:null
}

export const init = (data) => {
    Object.assign(initData,data)
}

export const get = async (url, options) => {
    options.method = 'get'
    let body = ''
    for (let item in options.data) {
        if (body.length > 0) body += `&`
        else body += '?'
        body += `${item}=${options.data[item]}`;
    }
    options.body = body
    return await fetchData(url, options);
}

export const post = async (url, options) => {
    options.method = 'post'
    return await fetchData(url, options);
}

export const put = async (url, options) => {
    options.method = 'put'
    return await fetchData(url, options);
}

export const del = async (url, options) => {
    options.method = 'delete'
    return await fetchData(url, options);
}

export const upload = async (url, body) => {
    return await fetch(initData.URL + url, {
        method: 'POST',
        credentials: 'include',
        body: body,
    }).then((rst) => {
        return rst.json()

    }).then(resData => {
        return dealRst(resData, {})
    }).catch(function (err) {
        console.log('catch fetch:' + err)
    })
}

async function fetchData(url, options) {

    if (options.method != 'get') options.body = JSON.stringify(options.data ? options.data : {})
    else {
        url += options.body
        delete options.body
    }
    if (!(/^https:\/\/|^http:\/\//.test(url))) url = initData.URL + url
    let opts = Object.assign({
        loading: true,
        data: {},
        url,
        deal: true,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    }, options)

    before(opts);
    return await fetch(opts.url, opts).then((rst) => {
        return rst.json()
    }).then(resData => {
        if (opts.deal) {
            return dealRst(resData, opts)
        }
        return resData
    }).catch(function (err) {
        console.log('catch fetch:' + err)
        if(opts.error){
            opts.error(err)
            return
        }
        if(initData.error) initData.error(err)
    })
}

// 发送前处理
function before(opts) {
    if(opts.fetchBefore) return opts.fetchBefore(opts)
    if(initData.fetchBefore) return initData.fetchBefore(opts)
    return opts
}
// 结果处理
function dealRst(resData, opts) {
    if(opts.success) return opts.success(resData, opts)
    if(initData.success) return initData.success(resData, opts)
    return resData
}
