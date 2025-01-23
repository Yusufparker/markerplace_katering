<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'profile' => $request->user()->load('profile') 
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function  updateMechantProfile(Request $request){
        $data = $request->only(['image', 'contact', 'location', 'description']);
        $auth = Auth::user();
        $user = User::find($auth->id);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('merchant-images', 'public');
            $data['image'] = $imagePath;
        }
        $profile = Profile::where('user_id', $user->id)->first();
        if (!$profile) {
            return response()->json([
                'message' => 'Profil tidak ditemukan',
            ], 404);
        }
        $profile->update(array_filter([
            'description' => $data['description'] ?? $profile->description,
            'contact' => $data['contact'] ?? $profile->contact,
            'location' => $data['location'] ?? $profile->location,
        ]));

        if (!empty($data['image'])) {
            $user->update([
                'image' => $data['image'],
            ]);
        }

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'profile' => $profile,
            'user' => $user,
        ], 200);

        

    }
}
