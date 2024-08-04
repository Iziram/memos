import UserAvatar from '@/components/UserAvatar';
import { User } from '@/types/proto/api/v1/user_service';
import React from 'react';

type CollaboratorUserProps = {
	user: User;
	filter: string;
	onClick: (nickname: string) => void;
};

const CollaboratorUser: React.FC<CollaboratorUserProps> = ({ user, filter, onClick }) => {
	const getHighlightedText = (text: string, highlight: string) => {
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
		return (
			<span>
				{parts.map((part, index) =>
					part.toLowerCase() === highlight.toLowerCase() ? (
						<span key={index} className='text-teal-700'>{part}</span>
					) : (
						part
					)
				)}
			</span>
		);
	};

	return (
		<div
			onClick={() => onClick(user.nickname || user.username)}
			className="cursor-pointer flex items-center mb-2 p-2 rounded bg-white dark:bg-zinc-800 rounded-lg border border-white dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700"
		>
			<UserAvatar avatarUrl={user.avatarUrl} className="shrink-0 mr-2" />
			<span className='mx-2'>{getHighlightedText(user.nickname || user.username, filter)}</span>
			<span className='text-gray-500 dark:text-gray-400 text-sm'>@{user.username}</span>
		</div>
	);
};

export default CollaboratorUser;