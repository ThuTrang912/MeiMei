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
            'id_card' => 'required|unique:manager,id_card',
            'role' => 'required',
        ]);

        // Tạo một bản ghi mới và lưu vào cơ sở dữ liệu
        $manager = Manager::create($validatedData);

        // Trả về phản hồi thành công
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
        // Retrieve ID, status, and role from the managers table
        $managers = Manager::all(['id_card', 'status', 'role']);

        // Transform data to desired format
        $statusList = $managers->map(function ($manager) {
            return [
                'id' => $manager->id_card,
                'status' => $manager->status ? '未使用' : '使用中',
                'role' => $manager->role, // Include the role information
            ];
        });

        // Return the status list as JSON response
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
