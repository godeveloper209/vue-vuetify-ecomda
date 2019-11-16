export const dateMixin = {
    data(){

    }
    ,
    created : function(){

    },
    methods:{
        getISODateFormat: function(milesec){
            let currentDate = new Date(milesec);
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let dt = currentDate.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return(year+'-' + month + '-'+dt);
        }
    }
}

export const tableMixin = {
    data(){

    }
    ,
    created : function(){

    },
    methods:{
        addMarkWord: function(str, keyword){
            if (keyword === '' || keyword === ' ')
                return str;
            let regex = new RegExp( keyword, "gi");
            return str.replace(regex, str=>'<mark>'+ str +'</mark>');
        }
    }
}