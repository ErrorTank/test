
const UrlFormat = {
    createUrlFormat(format) {
        // Code here
      
        return {
            format: (params) => {
                // Code here
                let keys = Object.keys(params);
                let matchParam = (str,[first,...rest]) =>{
                    if(!first){
                        return str;
                    }
                    return matchParam(str.replace(`:${first}`,params[first]),rest);
                };
                return matchParam(format,keys);
            },
            match: (url) => {
                // Code here
                let keys = format.match(/:(\w+)/gi);
                let regex = new RegExp(keys.reduce((total,cur) => {
                    return total.replace(cur,"(\\w+)")
                },format),"gi");
                let arr = regex.exec(url);
                if(!arr)
                    return arr;
                let [ignore,...result] =  arr;
                return result.reduce((total,cur,i) => {
                   total[keys[i].slice(1)] = cur;
                   return total;
                },{})
            },
        };
    }
};

exports.UrlFormat = UrlFormat;



console.log(UrlFormat.createUrlFormat("/aaaa/:ww/222-:ee").format({ww: "aaaa", "ee": "vvv"}));
// => /aaaa/aaaa/222-vvv

console.log(UrlFormat.createUrlFormat("/aaaa/:ww/222-:ee").match("/aaaa/aaaa/222-vvv"));
// => { ww: 'aaaa', ee: 'vvv' }
