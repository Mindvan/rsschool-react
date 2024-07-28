import React from 'react';
import cls from './styles.module.css';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {resetItems} from "../../store/reducers/selected.ts";
import ButtonCustom from "../UI/ButtonCustom/ButtonCustom.tsx";

const Flyout = () => {
    const dispatch = useAppDispatch();
    const selectedItems = useAppSelector(state => state.selected.items);

    const unselectAll = () => {
        dispatch(resetItems());
    };

    const dataConverter = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year= date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${day}${month}${year}_${hours}${minutes}${seconds}`;
    }

    const downloadData = () => {
        if (selectedItems.length === 0) return;

        const csvHeader = Object.keys(selectedItems[0]).join(',') + '\n';
        const csvRows = selectedItems.map(item => Object.values(item).join(',')).join('\n');
        const csvData = csvHeader + csvRows;
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        const nowDate = dataConverter();
        anchor.download = `${nowDate}.csv`;
        document.body.appendChild(anchor);
        anchor.click();

        URL.revokeObjectURL(url);
    }

    if (selectedItems.length === 0) return null;

    return (
        <div className={cls.flyout}>
            <span>{selectedItems.length === 1 ? '1 item is selected!' : `${selectedItems.length} items are selected!`}</span>
            <div className={cls.flyoutBtns}>
                <ButtonCustom onClick={unselectAll}>Unselect all</ButtonCustom>
                <ButtonCustom onClick={downloadData}>Download</ButtonCustom>
            </div>
        </div>
    );
};

export default Flyout;
