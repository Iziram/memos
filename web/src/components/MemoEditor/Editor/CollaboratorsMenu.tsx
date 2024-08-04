import clsx from "clsx";
import Icon from "../../Icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import React, { useState } from 'react';
import { useTranslate } from "@/utils/i18n";
import CollaboratorsList from "./CollaboratorsList";
import CollaboratorsBadgesRow from "./CollaboratorsBadgesRow";
import { User } from "@/types/proto/api/v1/user_service";

interface Props {
    className?: string;
    readonly?: boolean;
}

const CollaboratorsMenu = ({ className, }: Props) => {
    const t = useTranslate();
    const [searchValue, setSearchValue] = useState("");
    const [selectedCollaborator, setSelectedCollaborator] = useState<User[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <Popover>
            <PopoverTrigger
                className={clsx(className, "flex items-center justify-center w-8 h-8 rounded bg-zinc-50 dark:bg-zinc-900")}
            >
                <Icon.UserPlus className="w-4 h-auto shrink-0" />
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2">
                    <div className="w-full flex flex-row justify-between items-center">
                        <Icon.Search className="absolute left-4 w-4 h-auto opacity-40" />
                        <input
                            className="w-full text-gray-500 dark:text-gray-400 bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800 text-sm leading-7 rounded-lg p-1 pl-8 outline-none"
                            placeholder={t("collaborators.search-placeholder")}
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <CollaboratorsBadgesRow users={selectedCollaborator} deleteHandler={(user: User) => {
                        setSelectedCollaborator(selectedCollaborator.filter((u) => u.id !== user.id));
                    }} />
                    <CollaboratorsList filter={searchValue} onCollaboratorClick={(user: User) => {
                        if (selectedCollaborator.find((u) => u.id === user.id)) {
                            setSelectedCollaborator(selectedCollaborator.filter((u) => u.id !== user.id));
                            return;
                        }
                        setSelectedCollaborator([...selectedCollaborator, user]);
                    }} />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default CollaboratorsMenu;

