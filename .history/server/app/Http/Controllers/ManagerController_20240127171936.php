<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manager; // Import model Manager

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        // Validate request data
        $validatedData = $request->validate([
            'id_card' => 'required|unique:id_card',
            'role' => 'required',
        ]);

        // // Create a new Manager instance
        // $manager = new Manager();
        // $manager->id_card = $validatedData['id_card'];
        // $manager->role = $validatedData['role'];

        $manager = Manager::create($request->all());

        // Return a success response
        return response()->json(['message' => 'ID Card created successfully'], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $manager = Manager::find($id);

        if (!$manager) {
            return response()->json(['error' => 'Không tìm thấy manager'], 404);
        }

        // Lấy thông tin ID và Status từ manager
        $idCard = $manager->id_card;
        $status = $manager->status;

        // Xác định trạng thái dựa trên giá trị của status
        $statusLabel = $status ? '未使用' : '使用中';

        return response()->json([
            'id_card' => $idCard,
            'status' => $statusLabel
        ]);
    }

    public function getStatus()
    {
        // Lấy danh sách tất cả quản lý
        $managers = Manager::all();


        // Tạo một danh sách trạng thái với ID và trạng thái tương ứng
        $statusList = $managers->map(function ($manager) {
            return [
                'id' => $manager->id_card,
                'status' => $manager->status ? '未使用' : '使用中',
            ];
        });

        // Trả về danh sách trạng thái dưới dạng JSON
        return response()->json($statusList);
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
    }
}
