import UserAvatar from '@/components/UserAvatar';
import { User } from '@/types/proto/api/v1/user_service';
import React from 'react';

type CollaboratorsBadgesRowProps = {
    users: User[];
    deleteHandler: (user: User) => void;
    readonly?: boolean;
};

const CollaboratorsBadgesRow: React.FC<CollaboratorsBadgesRowProps> = ({ users, deleteHandler, readonly }) => {
    return (
        <div className="flex overflow-x-auto max-w-xs gap-2 mt-2">
            {users.map((user, index) => (
                <div key={index} className="flex items-center bg-zinc-50 dark:bg-zinc-900 rounded-full px-2 py-1 text-sm">
                    <span>@{user.username}</span>
                    {!readonly && (<button
                        onClick={() => deleteHandler(user)}
                        className="ml-2 text-red-500 hover:text-red-700"
                    >
                        &times;
                    </button>)}
                </div>
            ))}
        </div>
    );
};

export default CollaboratorsBadgesRow;