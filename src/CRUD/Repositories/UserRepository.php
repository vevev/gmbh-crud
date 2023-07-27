<?php

namespace Simple\CRUD\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Simple\CRUD\Models\User;

/**
 *
 */
class UserRepository extends AbstractRepository
{
    /**
     * @return string
     */
    public function modelName(): string
    {
        return User::class;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->getModel()->withTrashed()->get();
    }

    /**
     * @param     array     $data
     * @param     mixed     $id
     *
     * @return bool
     */
    public function update(array $data, mixed $id): bool
    {
        return $this->getModel()->where('id', $id)->update($data);
    }

    /**
     * @param     string     $id
     *
     * @return bool
     */
    public function delete(string $id): bool
    {
        $user = $this->findWithTrashed($id);
        $user->deleted_at = now();
        $user->status = $user::STATUS_DELETED;
        $user->save();

        return $user->save();
    }

    /**
     * @param     array     $data
     *
     * @return Model
     */
    public function create(array $data): Model
    {
        $user = $this->getModel()->newInstance($data);
        $user->name = $user->first_name . ' ' . $user->last_name;
        $user->password = Hash::make($user->password);
        $user->save();

        return $user;
    }
}
