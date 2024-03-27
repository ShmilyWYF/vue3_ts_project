const a=r=>r.replace(/^(\w{1})/,e=>e.toUpperCase());function s(r){let e=r.replace(/[A-Z]/g,function(t){return"_"+t.toLowerCase()});return e.slice(0,1)==="_"&&(e=e.slice(1)),e}export{a as f,s as g};
