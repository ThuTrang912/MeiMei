<?php

// ImageController.php (コントローラー)

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class PhotoController extends Controller
{
    public function upload(Request $request)
    {
        // ファイルのバリデーションや保存先の設定など必要な処理を追加
        if ($request->hasFile('image')) {

            $rules = [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif', // 画像ファイルの制約を指定する
            ];

            // アップロードされたファイルを取得
            $file = $request->file('image');

            $request->validate($rules);

            // ファイル名を生成する
            $fileName = time() . '_' . $file->getClientOriginalName();

            $disk = 'local';

            // ファイルを指定の場所に保存
            $path = $file->storeAs('public/images', $fileName, $disk);

            // シンボリックリンクを作成する
            $publicPath = Storage::url($path);


            // Imageモデルのインスタンスを作成
            $image = new Photo;

            // ファイル名を設定
            $image->photo_path = $publicPath;

            // データベースに保存
            $image->save();

            // 成功レスポンスを返す
            return response()->json(['image' => $image], 201);
        }

        // エラーレスポンスを返す
        return response()->json(['message' => 'No image found.'], 400);
    }
}
