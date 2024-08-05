import React, { useEffect, useState } from 'react';
import { User } from '@/types/proto/api/v1/user_service';
import { useUserStore } from '@/store/v1';
import { sortBy } from 'lodash-es';
import CollaboratorUser from './CollaboratorUser';
import { useTranslate } from '@/utils/i18n';

type CollaboratorsListProps = {
    filter: string;
    onCollaboratorClick: (username: string) => void;
};

const CollaboratorsList: React.FC<CollaboratorsListProps> = ({ filter, onCollaboratorClick }) => {

    const userStore = useUserStore();
    const t = useTranslate();
    const [users, setUsers] = useState<User[]>([]);
    const sortedUsers = sortBy(users, "id");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const users = await userStore.fetchUsers();
        setUsers(users);
    };

    const filteredUsers = sortedUsers.filter(user => {
        const searchText = user.nickname || user.username;
        if (filter.startsWith('@')) {
            return user.username.includes(filter.slice(1).toLowerCase());
        }
        return searchText.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div>
            {filteredUsers.length === 0 ? (
                <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                    {t('collaborators.search-empty')}
                </div>
            ) : (
                <div className="max-h-48 overflow-y-auto">
                    {filteredUsers.map((user, index) => (
                        <CollaboratorUser
                            key={index}
                            user={user}
                            filter={filter}
                            onClick={() => onCollaboratorClick(user.username)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollaboratorsList;