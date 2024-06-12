<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use Illuminate\Support\Facades\DB;


class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        //
        //
        $group = DB::table('group')
            ->where('id_card', '=', $id)
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
        $group = Group::create($request->all());
        return response()->json($group, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $group = Group::find($id);
        return response()->json($group, 200);

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
    public function destroy($id)
    {
        //

        $follower = DB::table('group')
            ->where('group_id', $id)
            ->delete();
        // Records were deleted successfully
        return response()->json(['message' => 'Contact deleted successfully'], 200);
    }

    public function searchGroup($id, $page, $search)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('group')
            ->where('id_card', '=', $id)
            ->where('group_name', 'like', '%' . $search . '%')
            ->count();

        $group = DB::table('group')
            ->where('id_card', '=', $id)
            ->where('group_name', 'like', '%' . $search . '%')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $group, 'totalPages' => $totalPages], 200);
    }

    public function group($id, $page)
    {
        //
        //
        $perPage = 10; // Số lượng mục trên mỗi trang

        // $group = Group::all();
        $total = DB::table('group')
            ->count();

        $group = DB::table('group')
            ->where('id_card', '=', $id)
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $group, 'totalPages' => $totalPages], 200);
    }
}
