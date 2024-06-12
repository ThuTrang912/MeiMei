<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contact;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class contactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //
    public function index()
    {
        $contact = Contact::all();
        return response()->json($contact, 200);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        //lấy các giá trị id cùng nhau
        $contact = Contact::where('id_card', $id)->get();
        if (!$contact) {
            // Nếu không tồn tại, trả về lỗi 404 - Not Found
            return response()->json(['error' => 'Contact not found'], 404);
        }
        return response()->json($contact, 200);
    }

    public function showNotification(string $id)
    {
        //lấy các giá trị id cùng nhau
        $followerContact = Contact::where('contact_id', $id)->get();
        if (!$followerContact) {
            // Nếu không tồn tại, trả về lỗi 404 - Not Found
            return response()->json(['error' => 'Contact not found'], 404);
        }
        return response()->json($followerContact, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_card, $contact_id)
    {
        // Check if the entry already exists in the contact table
        $existingContact = Contact::where('id_card', $id_card)->where('contact_id', $contact_id)->first();

        if (!$existingContact) {
            // If the entry doesn't exist, create a new one
            $existingContact = Contact::create([
                'id_card' => $id_card,
                'contact_id' => $contact_id,
            ]);
        } else {
            $existingContact->touch();
        }

        // Retrieve the 'created_at' timestamp
        $time = $existingContact->created_at;

        return response()->json(['message' => 'Contact updated successfully', 'time' => $time], 200);
    }

    /**
     * Remove the specified resource
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_card, $contact_id)
    {
        //
        // Use the delete method to delete records based on the given conditions
        $follower = DB::table('contact')
            ->where('id_card', $id_card)
            ->where('contact_id', $contact_id)
            ->delete();
        // Records were deleted successfully
        return response()->json(['message' => 'Contact deleted successfully'], 200);


    }

    // In contactController.php
    public function updateContact($id_card, $contact_id)
    {
        // Check if the entry already exists in the contact table
        $existingContact = Contact::where('id_card', $id_card)->where('contact_id', $contact_id)->first();


        if (!$existingContact) {
            // If the entry doesn't exist, create a new one
            $existingContact = Contact::create([
                'id_card' => $id_card,
                'contact_id' => $contact_id,
                'notification' => true,
            ]);
        } else {
            // Manually set the 'updated_at' timestamp to the current time
            //$existingContact->touch();
            $affectedRows = DB::table('contact')
                ->where('id_card', $id_card)
                ->where('contact_id', $contact_id)
                ->update(['updated_at' => now()]);
        }

        // Retrieve the 'updated_at' timestamp
        // Retrieve the 'updated_at' timestamp (optional)
        $updatedTime = DB::table('contact')
            ->where('id_card', $id_card)
            ->where('contact_id', $contact_id)
            ->value('updated_at');

        return response()->json(['message' => 'Contact updated successfully', 'updated_at' => $updatedTime], 200);
    }

    public function updateLike($id_card, $contact_id)
    {
        // Find the contact record
        $contact = Contact::where('id_card', $id_card)
            ->where('contact_id', $contact_id)
            ->first(); // Use 'first()' to get a single result

        $contacts = Contact::where('id_card', $id_card)
            ->get();


        if ($contact && $contacts->isNotEmpty()) {
            // Log the original data
            Log::info('Original Contact Data', ['data' => $contact->toArray()]);
            // Log all contacts with the same id_card
            Log::info('All Contacts with the same id_card', ['data' => $contacts->toArray()], '\n');

            // Toggle the 'like' field
            $contact->where('id_card', $id_card)
                ->where('contact_id', $contact_id)
                ->update(['like' => !$contact->like, 'updated_at' => $contact->updated_at]);


            // Log the updated data
            Log::info('Contact updated', ['data' => $contact->toArray()]);

            // Fetch all contacts with the same id_card
            $contacts = Contact::where('id_card', $id_card)
                ->get();

            // Log all contacts with the same id_card
            Log::info('All Contacts with the same id_card', ['data' => $contacts->toArray()], '\n');


            return response()->json(['message' => 'Contact updated successfully', 'data' => $contact, 'all_contacts' => $contacts], 200);
        } else {
            // Log the error or handle it appropriately
            return response()->json(['error' => 'Contact not found'], 404);
        }
    }


    public function updateNotification($id)
    {
        // Update all records where contact_id is $id and notification is true
        $affectedRows = Contact::where('contact_id', $id)
            ->where('notification', true)
            ->update(['notification' => false]);

        return response()->json(['affectedRows' => $affectedRows], 200);
    }




    public function getFollowing($id_card, $page)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('contact')
            ->where('id_card', $id_card)
            ->count();

        // $created_at = DB::table('contact')
        //     ->where('id_card', $id_card);

        $contacts = DB::table('contact')
            ->join('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.img_url', 'user.user_name', 'user.email', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.id_card', $id_card)
            ->orderBy('user.user_name') // Add this line for alphabetical sorting
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $contacts, 'totalPages' => $totalPages,], 200);
    }

    public function search($id_card, $page, $search)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('contact')
            ->leftJoin('user', 'contact.contact_id', '=', 'user.id_card')
            ->where('contact.id_card', $id_card)
            ->where(function ($query) use ($search) {
                $query->where('user.user_name', 'like', '%' . $search . '%')
                    ->orWhere('user.email', 'like', '%' . $search . '%');
            })
            ->count();

        $users = DB::table('contact')
            ->leftJoin('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.*')
            ->where('contact.id_card', $id_card)
            ->where(function ($query) use ($search) {
                $query->where('user.user_name', 'like', '%' . $search . '%')
                    ->orWhere('user.email', 'like', '%' . $search . '%');
            })
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $users, 'totalPages' => $totalPages], 200);
    }

    public function getRecent($id_card, $page)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('contact')
            ->where('id_card', $id_card)
            ->count();

        $contacts = DB::table('contact')
            ->join('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.*', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.id_card', $id_card)
            ->orderBy('contact.updated_at', 'desc') // Add this line for sorting by updated_at in descending order
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $contacts, 'totalPages' => $totalPages], 200);
    }

    public function getFavorite($id_card, $page)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('contact')
            ->where('id_card', $id_card)
            ->where('like', true) // Only count rows where 'like' is true
            ->count();

        $contacts = DB::table('contact')
            ->join('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.img_url', 'user.user_name', 'user.email', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.id_card', $id_card)
            ->where('contact.like', true) // Only fetch rows where 'like' is true
            ->orderBy('user.user_name')
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $contacts, 'totalPages' => $totalPages], 200);
    }

    public function searchFavorite($id_card, $page, $search)
    {
        $perPage = 10; // Số lượng mục trên mỗi trang

        $total = DB::table('contact')
            ->leftJoin('user', 'contact.contact_id', '=', 'user.id_card')
            ->where('contact.id_card', $id_card)
            ->where('contact.like', true)
            ->where(function ($query) use ($search) {
                $query->where('user.user_name', 'like', '%' . $search . '%')
                    ->orWhere('user.email', 'like', '%' . $search . '%');
            })
            ->count();

        $users = DB::table('contact')
            ->leftJoin('user', 'contact.contact_id', '=', 'user.id_card')
            ->select('contact.*', 'user.*')
            ->where('contact.id_card', $id_card)
            ->where('contact.like', true)
            ->where(function ($query) use ($search) {
                $query->where('user.user_name', 'like', '%' . $search . '%')
                    ->orWhere('user.email', 'like', '%' . $search . '%');
            })
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();

        $totalPages = ceil($total / $perPage);

        return response()->json(['data' => $users, 'totalPages' => $totalPages], 200);
    }

    public function getNewNotification($id)
    {
        $newNotificationCount = DB::table('contact')
            ->where('contact_id', $id)
            ->where('notification', true)
            ->count();

        $newNotification = DB::table('contact')
            ->join('user', 'contact.id_card', '=', 'user.id_card')
            ->select('contact.*', 'user.*', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.contact_id', $id)
            ->where('notification', true)
            ->orderBy('contact.created_at', 'desc')
            ->get(); // Add this line to execute the query and get the results

        return response()->json(['data' => $newNotification, 'newNotificationCount' => $newNotificationCount], 200);
    }
    public function getNotification($id)
    {
        $notificationCount = DB::table('contact')
            ->where('contact_id', $id)
            ->count();

        $notification = DB::table('contact')
            ->join('user', 'contact.id_card', '=', 'user.id_card')
            ->select('contact.*', 'user.*', 'contact.created_at as contact_created_at', 'contact.updated_at as contact_updated_at')
            ->where('contact.contact_id', $id)
            ->orderBy('contact.created_at', 'desc')
            ->get(); // Add this line to execute the query and get the results

        return response()->json(['data' => $notification, 'newFollowerCount' => $notificationCount], 200);
    }

}
