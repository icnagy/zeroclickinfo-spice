#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BeerDb )],
    'beer joker' => test_spice(
        '/js/spice/beer_db/joker',
        call_type => 'include',
        caller => 'DDG::Spice::BeerDb'
    ),
    'beer heineken' => test_spice(
        '/js/spice/beer_db/heineken',
        caller    => 'DDG::Spice::BeerDb',
    ),
);

done_testing;

