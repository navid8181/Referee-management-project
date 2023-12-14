


function removeWrongData(obj = {}, blockList =[]) {

    Object.keys(obj).forEach(key => {
        if (blockList.includes(key)) 
            delete obj[key]
         else {
            if (typeof obj[key] === "string") 
                obj[key].trim()


            


            if (Array.isArray(obj[key]) && obj[key].length > 0) 
                obj[key] = obj[key].map(value => value.trim());
            
            if (Array.isArray(obj[key]) && obj[key].length == 0) 
                delete obj[key];
            


            if ([
                "",
                " ",
                0,
                null,
                undefined,
                "0",
                NaN
            ].includes(obj[key])) 
                delete obj[key]

            

        }


    })

}


module.exports = {removeWrongData}