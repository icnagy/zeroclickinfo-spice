(function (env) {
    "use strict";
    env.ddg_spice_beer_db = function(api_result){
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.data || api_result.data.size === 0) {
            return Spice.failed('beer_db');
        }
        var searchTerm = DDG.get_query().replace(/^beer\s*/i, '').trim();
        // Render the response
        Spice.add({
            id: "beer_db",
            name: "Food & drink",
            data: api_result.data,
            meta: {
                sourceName: "Brewery DB",
                sourceUrl: 'http://www.brewerydb.com',
                secondaryText: "Build at DuckDuckGoHack@Glasgow",
                sourceLogo: {
                    url: "http://www.brewerydb.com/img/badge.png",
                    width: '16',
                    height: '16'
                },
                searchTerm: searchTerm,
                total: api_result.data.size,
                minTopicsForMenu: 0,
                itemType: (api_result.data.length === 1) ? 'Beer or brewery' : 'Beers or breweries'
            },
            normalize: function(item) {
                if(item.type === "brewery" || item.type === "guild")
                    return {
                        icon: item.images && item.images.icon ? item.images.icon : "",
                        title: item.name,
                        altSubtitle: item.nameShortDisplay,
                        subtitle: item.established ? "Established: " + item.established : "",
                        description: item.type,

                        answerItemTopic: item.type,

                        img_m: item.images && item.images.large ? item.images.large : "",
                        heading: item.name,
                        brand: item.nameShortDisplay,
                        url: "http://www.brewerydb.com/brewery/"+item.id,
                        abstract: item.description
                   };
                else
                    return {
                        icon: item.labels ? item.labels.icon : "",
                        description: item.type,
                        img_m: item.labels ? item.labels.large : "",
                        heading: item.name,
                        brand: item.breweries[0].nameShortDisplay,
                        subtitle: item.breweries[0].nameShortDisplay,
                        abstract: item.description,
                        answerItemTopic: item.type,
                        url: "http://www.brewerydb.com/beer/"+item.id,
                        title: item.name
                    };
            },
            templates: {
                group: 'icon'
            },
            sort_fields: {
                type: function(a, b){
                    return (a.type < b.type) ? -1 : 1;
                },
                name: function(a, b){
                    return (a.name < b.name) ? -1 : 1;
                }
            },
            sort_default: 'type'
        });
    };
}(this));
