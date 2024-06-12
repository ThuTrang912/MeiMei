<?php

namespace App\Http\Controllers;

use App\Models\ManageGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ManageGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $group = DB::table('manage_group')
            ->orderBy('group_id')
            ->get();
        // $request->user();
        return response()->json(['data' => $group], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $group = ManageGroup::create($request->all());
        return response()->json($group, 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($group_id)
    {
        //
        $groupUser = DB::table('manage_group as g')
            ->select('g.group_id', 'g.id_card', 'g.created_at', 'u.user_name', 'u.email', 'u.img_url', 'c.like')
            ->leftJoin('user as u', 'g.id_card', '=', 'u.id_card')
            ->leftJoin('contact as c', 'g.id_card', '=', 'c.contact_id')
            ->where('g.group_id', '=', $group_id)
            ->get();

        return response()->json(['data' => $groupUser], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($group_id, $id_card)
    {
        $follower = DB::table('manage_group')
            ->where('group_id', $group_id)
            ->where('id_card', $id_card)
            ->delete();
        // Records were deleted successfully
        return response()->json(['message' => 'Contact deleted successfully'], 200);


    }

    public function deleteFollower($id_card)
    {
        $follower = DB::table('manage_group')
            ->where('id_card', $id_card)
            ->delete();
        // Records were deleted successfully
        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }

    public function check($group_id, $id_card)
    {
        //
        $groupUser = DB::table('manage_group')
            ->where('group_id', $group_id)
            ->where('id_card', $id_card)
            ->get();

        return response()->json($groupUser, 200);
    }
    public function checkId($id_card)
    {
        //
        $groupUser = DB::table('manage_group')
            ->select('group_id')
            ->where('id_card', $id_card)
            ->pluck('group_id');

        return response()->json(['data' => $groupUser], 200);
    }


}
