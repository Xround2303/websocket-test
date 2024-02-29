<?php

use Illuminate\Support\Facades\Route;
use Sw24\Bitrix24Auth\BuilderBitrix24Client;
use Sw24\Bitrix24Auth\Dto\DtoAuth;

Route::match(['GET', 'POST'], '/{vue_capture?}', function (\Illuminate\Http\Request $request) {


    return view('home', [

    ]);

})->where('vue_capture', '[\/\w\.-]*');

