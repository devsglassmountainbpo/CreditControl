/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Table,
    Badge,
    Button,
    Modal,
    Label,
    TextInput,
    Select

} from "flowbite-react";
import type { FC, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import { useEffect, useState } from "react";

import { HiOutlinePencilAlt, HiSearch } from "react-icons/hi";


import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
import axios from "axios";
import { Accordion } from "flowbite-react";


import CryptoJS from "crypto-js";
import { utils, writeFile } from 'xlsx-js-style';



const created_user3 = localStorage.getItem("badgeSession") || "";
const created_user2 = (created_user3 ? CryptoJS.AES.decrypt(created_user3, "Tyrannosaurus") : "");
const created_user = (created_user2 ? created_user2.toString(CryptoJS.enc.Utf8) : "");


const AllReports: FC = function () {

    const [isOpen, setOpen] = useState(false);

    const url = `https://bn.glassmountainbpo.com:8080/vendors/hired/`;

    const [result, setResult] = useState<any>([]); //JSON Axios Data
    const [badge, setBadge] = useState<any>(''); //Badge
    const [report, setReport] = useState('');


    const handleTrack = () => {
        if (badge.length !== 0) {
            // Do something with value

            axios.get(url + badge)
                .then((response) => {
                    setResult(response.data)
                    // axios returns API response body in .data
                });
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleTrack();
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let reportUrl = '';
        if (report === 'Payroll') {
            reportUrl = `https://bn.glassmountainbpo.com:8080/creditControl/reportOne/${badge}`;
        } else if (report === 'Payment') {
            reportUrl = `https://bn.glassmountainbpo.com:8080/creditControl/reportTwo/${badge}`;
        }

        try {
            const response = await axios.get(reportUrl);
            const data = response.data;
            const csv = jsonToCsv(data);
            downloadCsv(csv, `${report}_report_${badge}.csv`);
        } catch (error) {
            console.error('Error fetching the report:', error);
        }
    };

    const jsonToCsv = (json: any) => {
        const headers = Object.keys(json[0]);
        const csvRows = [headers.join(','), ...json.map((row: any) =>
            headers.map(header => `"${row[header]}"`).join(',')
        )];
        return csvRows.join('\n');
    };

    const downloadCsv = (csv: string, filename: string) => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <NavbarSidebarLayout2 isFooter={true}>
            <div className="block items-center justify-between border-b rounded-tl-2xl rounded-tr-2xl border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 className="text-xl ml-4 mt-4 mb-5 font-semibold text-gray-900 dark:text-white sm:text-2xl">
                            Get Report by Badge
                        </h1>
                        <>
                            <Button color="primary" className="ml-4" onClick={() => setOpen(true)}>
                                <div className="flex items-center gap-x-3">
                                    <HiSearch className="text-xl" />
                                    Search for Employee
                                </div>
                            </Button>
                            <Modal onClose={() => setOpen(false)} show={isOpen}>
                                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                                    <strong>Get Report by Badge</strong>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <Label htmlFor="badge">Badge</Label>
                                            <div className="mt-1">
                                                <TextInput
                                                    id="badgeAddUser"
                                                    name="badgeAddUser"
                                                    placeholder="3814"
                                                    value={badge}
                                                    onChange={e => {
                                                        setBadge(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => handleKeyPress(e)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="fullname">Full name</Label>
                                            <div className="mt-1">
                                                <TextInput
                                                    id="fullname"
                                                    name="fullname"
                                                    placeholder="John Doe"
                                                    value={result.first_name !== undefined ? result.first_name + " " + result.first_last_name : ""}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="position">Position</Label>
                                            <div className="mt-1">
                                                <TextInput
                                                    id="position"
                                                    name="position"
                                                    placeholder="Developer"
                                                    value={result !== undefined ? result.name_job : " "}
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="department">Department</Label>
                                            <div className="mt-1">
                                                <TextInput
                                                    id="department"
                                                    name="department"
                                                    placeholder="IT"
                                                    value={result !== undefined ? result.name_rol : " "}
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="report">Status</Label>
                                            <div className="mt-1">
                                                <TextInput
                                                    id="status"
                                                    name="status"
                                                    placeholder="Active"
                                                    value={result.active == '1' ? "Active" : result.active == '0' ? "Inactive" : " "}
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="report">Report</Label>
                                            <div className="mt-1">
                                                <Select
                                                    id="report"
                                                    name="report"
                                                    value={report}
                                                    onChange={(e) => setReport(e.target.value)}
                                                    required
                                                >
                                                    <option>Select</option>
                                                    <option value='Payroll'>Payroll</option>
                                                    <option value='Payment'>Payments</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        color="primary"
                                        onClick={(e) => { handleSubmit(e); }}>
                                        Download
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </div>
                </div>
            </div>

        </NavbarSidebarLayout2>

    );
};




export default AllReports;