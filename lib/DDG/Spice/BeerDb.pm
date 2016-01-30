package DDG::Spice::BeerDb;
# ABSTRACT: Search for Hacker News

use strict;
use DDG::Spice;

triggers startend => "beer", "yeast";

spice to => 'https://hn.algolia.com/api/v1/search?query=$1&tags=story';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
