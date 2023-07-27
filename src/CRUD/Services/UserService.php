<?php

namespace Simple\CRUD\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Simple\CRUD\Contracts\Repositories\UserRepositoryContract;
use Simple\CRUD\Contracts\Services\UserServiceContract;
use Simple\CRUD\Models\User;

/**
 *
 */
class UserService implements UserServiceContract
{
    /**
     * @param     UserRepositoryContract     $userRepository
     */
    public function __construct(
        private UserRepositoryContract $userRepository
    ) {}

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return $this->userRepository->all();
    }

    /**
     * @param     array     $data
     *
     * @return Model
     */
    public function store(array $data): Model
    {
        return $this->userRepository->create($data);
    }

    /**
     * @param     array     $data
     *
     * @return bool
     */
    public function update(array $data, $id): bool
    {
        return $this->userRepository->update($data, $id);
    }

    /**
     * @param     string     $id
     *
     * @return bool
     */
    public function destroy(string $id): bool
    {
        return $this->userRepository->delete($id);
    }

    public function show(string $id): User
    {
        return $this->userRepository->find($id);
    }

    public function showWithTrashed(string $id): User
    {
        return $this->userRepository->findWithTrashed($id);
    }
}
