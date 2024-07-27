<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use App\Models\Manager;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user = User::all();
        // $request->user();
        return response()->json($user, 200);
    }

    public function isRegistrationAllowed(string $id)
    {
        $registrationAllowed = false;
        $exists = false;

        $manager = Manager::where('id_card', $id)->first();

        // Check if a user with the given id_card exists
        if ($manager) {
            $exists = true;
            // If the user exists, check if registration is allowed
            $registrationAllowed = $manager->status;
        }
        // If the user does not exist, registration is allowed by default
        return response()->json([
            'exists' => $exists,
            'registration_allowed' =>  $registrationAllowed,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     *
     */
    public function store(Request $request)
    {
        $idCard = $request->input('id_card');

        // Log the ID card
        Log::info('id card', ['data' => $idCard]);

        // Create a new user
        $user = User::create($request->all());
        // Log the new user data
        Log::info('new user', ['data' => $user->toArray()]);

        // Update the manager's status if one exists with the given ID card
        $manager = Manager::where('id_card', $idCard)->first();
        if ($manager) {
            $manager->update(['status' => false]);
            // Log the updated manager data
            Log::info('manager', ['data' => $manager->toArray()]);
        } else {
            // Log that no manager was found
            Log::info('manager', ['data' => 'No manager found for ID card: ' . $idCard]);
        }

        // Return the created user data
        return response()->json($user, 201);
    }






    /**
     * Display the specified resource.
     *
     *
     */
    public function show(string $id)
    {
        //
        $user = User::find($id);
        return response()->json($user, 200);
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
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($request->hasFile('image')) {
            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif', // 画像ファイルの制約を指定する
            ];

            $file = $request->file('image');

            $request->validate($rules);

            $fileName = time() . '_' . $file->getClientOriginalName();

            $disk = 'local';

            $path = $file->storeAs('public/images/img_url', $fileName, $disk);

            $publicPath = Storage::url($path);

            $user->img_url = $publicPath;

            $user->save();
        }


        $user->fill($request->all()); // Use fill() instead of update() to assign the values

        $user->save();

        return response()->json($user, 200);
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
        $user = User::find($id);
        $user->delete();
        return response()->json('user deleted', 204);
    }

    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => ['required', 'email'],
    //         'password' => ['required'],
    //     ]);

    //     if (!Auth::attempt($credentials)) {
    //         throw ValidationException::withMessages([
    //             'email' => ['The provided credentials are incorrect.'],
    //         ]);
    //     }


    //     return $request->user();
    // }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Lấy thông tin user đã đăng nhập
        $user = Auth::user();

        // Kiểm tra vai trò của user trong bảng manager
        $manager = Manager::where('id_card', $user->id_card)->first();

        if ($manager && $manager->role === 'admin') {
            // Nếu user có vai trò là admin, chuyển hướng đến trang cardManages
            return redirect('/cardManages');
        } else {
            // Nếu không phải admin, có thể thực hiện chuyển hướng đến trang chính của ứng dụng hoặc bất kỳ trang nào khác
            return redirect('/main/' . $user->id_card);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
    //upload image
    public function uploadImage(Request $request)
    {
        $item_image_path = "";
        if ($request->hasFile('item_image_file')) {
            $item_image_path = $request->item_image_file->store('images/item', 's3');
        }

        return response()->json(["href" => "//" . env('CDN_DOMAIN') . "/" . $item_image_path]);
    }
}
