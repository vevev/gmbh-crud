<?php

namespace Simple\CRUD\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Simple\CRUD\Contracts\Services\UserServiceContract;
use Simple\CRUD\Models\User;
use Simple\CRUD\Requests\UserPostRequest;
use Simple\CRUD\Requests\UserPutRequest;
use Simple\CRUD\Responses\UserResponse;

class UserController extends Controller
{
    public function __construct(
        private readonly UserServiceContract $userService,
        private readonly UserResponse        $userResponse,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(): UserResponse
    {
        return $this->userResponse->setContent(
            $this->userService->index()
        );
    }

    /**
     * @param     UserPostRequest     $request
     *
     * @return Model
     */
    public function store(UserPostRequest $request): Model
    {
        return $this->userService->store([
            ...$request->only(['first_name', 'last_name', 'status', 'email', 'password']),
            'updated_at' => now(),
            'created_at' => now(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->userService->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserPutRequest $request, string $id)
    {
        $this->userService->update([
            ...$request->only(['first_name', 'last_name', 'status']),
            'updated_at' => now(),
        ], $id);

        return $this->userService->show($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): User
    {
        $this->userService->destroy($id);

        return $this->userService->showWithTrashed($id);
    }
}
