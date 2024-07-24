import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    useGetRelationQuery,
    useGetRelationByIdQuery,
    useAddRelationMutation,
    useUpdateRelationMutation,
    useDeleteRelationMutation,
} from "../../../redux/services/RelationMasterService";

import { toast } from "react-toastify";
import { TextInput, CheckBox } from "../../../Inputs";
import FormHeader from "../../../Basic/components/FormHeader";
import FormReport from "../../../Basic/components/FormReportTemplate";
import ReportTemplate from '../../../Basic/components/ReportTemplate';

const MODEL = "Relation Master";

export default function Relation() {
    const [form, setForm] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const childRecord = useRef(0);

    const { data: allData, isLoading, isFetching } = useGetRelationQuery({ searchParams: searchValue });

    // Add a console log to check the response
    console.log("Fetched allData:", allData);

    const {
        data: singleData,
        isFetching: isSingleFetching,
        isLoading: isSingleLoading,
    } = useGetRelationByIdQuery(id, { skip: !id });

    const [addData] = useAddRelationMutation();
    const [updateData] = useUpdateRelationMutation();
    const [removeData] = useDeleteRelationMutation();

    const syncFormWithDb = useCallback(
        (data) => {
            if (id) setReadOnly(true);
            setName(data?.name || "");
            setActive(id ? (data?.active ? data.active : false) : true);
        },
        [id]
    );

    useEffect(() => {
        syncFormWithDb(singleData?.data);
    }, [isSingleFetching, isSingleLoading, id, syncFormWithDb, singleData]);

    const data = {
        name, active, id,
    };

    const validateData = (data) => data.name;

    const handleSubmitCustom = async (callback, data, text) => {
        try {
            await callback(data).unwrap();
            setId("");
            syncFormWithDb(undefined);
            toast.success(`${text} Successfully`);
        } catch (error) {
            console.log("handle", error);
        }
    };

    const saveData = () => {
        if (!validateData(data)) {
            toast.info("Please fill all required fields...!", {
                position: "top-center",
            });
            return;
        }
        if (!window.confirm("Are you sure to save the details?")) {
            return;
        }
        if (id) {
            handleSubmitCustom(updateData, data, "Updated");
        } else {
            handleSubmitCustom(addData, data, "Added");
        }
    };

    const deleteData = async () => {
        if (id) {
            if (!window.confirm("Are you sure to delete?")) {
                return;
            }
            try {
                await removeData(id).unwrap();
                setId("");
                toast.success("Deleted Successfully");
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const handleKeyDown = (event) => {
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === "s") {
            event.preventDefault();
            saveData();
        }
    };

    const onNew = () => {
        setId("");
        setReadOnly(false);
        setForm(true);
        setSearchValue("");
        syncFormWithDb(undefined);
    };

    const onDataClick = (id) => {
        setId(id);
        setForm(true);
    };

    const tableHeaders = [" Name", "Status"];
    const tableDataNames = ["dataObj.name", "dataObj.active"];

    if (!form)
        return (
            <ReportTemplate
                heading={MODEL}
                tableHeaders={tableHeaders}
                tableDataNames={tableDataNames}
                loading={isLoading || isFetching}
                setForm={setForm}
                data={allData?.data}
                onClick={onDataClick}
                onNew={onNew}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        );

    return (
        <div
            onKeyDown={handleKeyDown}
            className="md:items-start md:justify-items-center grid h-full bg-theme"
        >
            <div className="flex flex-col frame w-full h-full">
                <FormHeader
                    onNew={onNew}
                    onClose={() => {
                        setForm(false);
                        setSearchValue("");
                    }}
                    model={MODEL}
                    saveData={saveData}
                    setReadOnly={setReadOnly}
                    deleteData={deleteData}
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-x-2 overflow-clip">
                    <div className="col-span-3 grid md:grid-cols-2 border overflow-auto">
                        <div className="mr-1 md:ml-2">
                            <fieldset className="frame my-1">
                                <legend className="sub-heading">Page Info</legend>
                                <div className="grid grid-cols-1 my-2">
                                    <TextInput
                                        name="Relation Type"
                                        type="text"
                                        value={name}
                                        setValue={setName}
                                        required={true}
                                        readOnly={readOnly}
                                        disabled={(childRecord.current > 0)}
                                    />
                                    <CheckBox
                                        name="Active"
                                        readOnly={readOnly}
                                        value={active}
                                        setValue={setActive}
                                    />
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="frame hidden md:block overflow-x-hidden">
                        <FormReport
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            setId={setId}
                            tableHeaders={tableHeaders}
                            tableDataNames={tableDataNames}
                            data={allData?.data}
                            loading={isLoading || isFetching}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
