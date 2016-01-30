package DDG::Spice::BeerDb;

# ABSTRACT: Search for Beer, Brewery, Hop, Yeast.
# Unfortunately brewerydb has a rate limit of 400 requests/day...
# Anyone interested in having this live should ask brewerydb for an unlimited API key.

use strict;
use DDG::Spice;

spice is_cached => 1;
spice proxy_cache_valid => "200 31d";

spice wrap_jsonp_callback => 0;

triggers startend => "beer", "ipa", "brewery";

spice to => 'http://api.brewerydb.com/v2/search?q=$1&key=40f03257bd375c22e085819c44226c66&format=json&withBreweries=Y&order=name&sort=ASC';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
