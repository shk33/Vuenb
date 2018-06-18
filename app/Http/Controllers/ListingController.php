<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use	App\Listing;

class ListingController extends Controller
{
	public function getHomeWeb(Request $request)
	{
		$listings = $this->getListingSummaries();
		$listings =	$this->addMetaData($listings, $request);

		return view('app', ['data' => $listings]);
	}

	public function getHomeApi(Request $request)
	{
		$listings = $this->getListingSummaries();
		return	response()->json($listings);
	}

	public function getListingApi(Listing $listing)
	{
		$data = $this->getListing($listing);
		return	response()->json($data);
	}

	public function getListingWeb(Listing $listing, Request $request)
	{
		$data = $this->getListing($listing);
		$data = $this->addMetaData($data,$request);

		return view('app',['data' => $data]);
	}

	/*
	* Private Methods
	*/

	private function getListingSummaries()
	{
		$listings = Listing::all([
			'id', 'address', 'title', 'price_per_night'
		]);
		$listings->transform(function ($listing)
		{
			$listing->thumb	= asset( 'images/' . $listing->id . '/Image_1_thumb.jpg');
			return	$listing;
		});
		$listings =	collect(['listings'	=>	$listings->toArray()]);

		return $listings;
	}

	private function getListing($listing)
	{
		$model = $listing->toArray();

		for ($i = 1; $i <= 4; $i++) { 
			$model['image_'.$i]	= asset(
					'images/'.$listing->id	.'/Image_'.$i.'.jpg'
			);
		}

		return collect(['listing' => $model]);
	}

	private function addMetaData($collection, $request)
	{
		$auth = Auth::check();

		return $collection->merge([
			'path'  => $request->getPathInfo(),
			'auth'  => $auth,
			'saved' => $auth ? Auth::user()->saved : []
		]);
	}
}
