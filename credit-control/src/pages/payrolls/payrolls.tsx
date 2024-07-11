/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Modal,
    Select,
    Table,
    TextInput,
    Button,
    Label, Badge,
    Card, Alert, Accordion
} from "flowbite-react";
import type { FC, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import { useEffect, useState } from "react";

import { HiTable } from "react-icons/hi";
import {
    HiDocumentDownload,
    HiPlus,
} from "react-icons/hi";

import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
import axios from "axios";
import CryptoJS from "crypto-js";
import { utils, writeFile } from 'xlsx-js-style';
import { FiletypeCsv, FiletypeXlsx } from 'react-bootstrap-icons';
import UAParser from 'ua-parser-js';
import * as XLSX from 'xlsx';


import { HiIdentification } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";








const created_user3 = localStorage.getItem("badgeSession") || "";
const created_user2 = (created_user3 ? CryptoJS.AES.decrypt(created_user3, "Tyrannosaurus") : "");
const created_user = (created_user2 ? created_user2.toString(CryptoJS.enc.Utf8) : "");


const PayrollAll: FC = function () {

    const [sharedState, setSharedState] = useState(false);
    const updateSharedState = (newValue: boolean) => {

        setSharedState(newValue);
    }


    console.log('$%^CreateUser', created_user, setSharedState)
    return (
        <NavbarSidebarLayout2 isFooter={true}>
            <Payroll
                sharedState={sharedState} />
        </NavbarSidebarLayout2>
    );
};



const Payroll: FC<any> = function ({ sharedState }: any) {



    interface User {
        name: string;
        id: string;
        header: string | number | boolean;  // Especifica los tipos permitidos
    }

    interface Users {
        name: string;
        id: string;
        id_bank: string;
        badge: string;
        reference_number: string;
        active: string;
        credit_start_date: string;
        credit_end_date: string;
        status_credit: string;
        pending_payment: string;
        credit_total: string;
        total_payment: number;
        date_created: string;
    }


    const [dataGraphis, setDataGraphis] = useState<User[]>([]);
    const [Filtrado, setFiltrado] = useState<Users[]>([]);


    const [data, setData]: any = useState([]);
    const [activeLink, setActiveLink] = useState('');


    useEffect(() => {

    }, [activeLink]);


    console.log(activeLink)

    //filtrando datos para los reportes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphisRes] = await Promise.all([
                    axios.get('https://bn.glassmountainbpo.com:8080/credit/payments'),
                ]);
                setDataGraphis(graphisRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sharedState]);

    useEffect(() => {
        const fetchData3 = async () => {
            try {
                const [dataPayroll] = await Promise.all([
                    axios.get('https://bn.glassmountainbpo.com:8080/credit/list_payrolls'),
                ]);
                setFiltrado(dataPayroll.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData3();
    }, [sharedState]);


    const [isReady, setIsReady] = useState(false);

    useEffect(() => {


        const handleReadyStateChange = () => {
            setIsReady(true)
            if (document.readyState === 'complete') {
                console.log('listo');
                setIsReady(true);
            }
        };
        document.addEventListener('readystatechange', handleReadyStateChange);


    }, []);

    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (rowIndex: any, item: any) => {

        console.log('=======================> enviamos este item', item)
        setExpandedRow(rowIndex === expandedRow ? null : rowIndex);
    };


    useEffect(() => {
        if (isReady) {
            const checkboxes: any = document.querySelectorAll('#devices input[type="checkbox"]');
            if (checkboxes.length > 0) {
                console.log('listo');
                checkboxes[0].click();

            }
        }
    }, [sharedState]);

    console.log(dataGraphis);



    const columnOrder = ['id', 'name', 'total_records', 'pending_count', 'Completed_count'];

    return (
        <div>
            <div className="block items-center justify-between border-b rounded-tl-2xl rounded-tr-2xl border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-700 sm:flex"
                style={{
                    backgroundImage: `linear-gradient(rgba(76, 175, 80, 1.7), rgba(139, 195, 74, 0.7)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 210'%3E%3Cg transform='rotate(120 90 90)'%3E%3Crect x='2' y='80' width='90' height='60' fill='%238BC34A'/%3E%3Crect x='60' y='30' width='70' height='40' fill='%239CCC65'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '350px 250px', // Adjust the size of the SVG pattern
                    backgroundRepeat: 'repeat', // Ensure the pattern repeats across the strip
                    backgroundPosition: 'center',
                    position: 'relative',
                    height: '120px', // Set the height of the strip
                    color: 'white', // Ensure text is visible against the dark background
                }}

            >               <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 style={{ zoom: 0.90 }} className="text-xl ml-4 mt-4 font-semibold text-white-900 dark:text-white sm:text-2xl">
                            List of banks
                        </h1>
                    </div>
                    <div className="sm:flex" style={{ zoom: 0.90 }}>
                        <div className="mb-3 ml-4 hidden items-center dark:divide-white-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">


                        </div>

                        <div className="ml-auto mr-4 flex items-center space-x-2 sm:space-x-3">
                            <AddTaskModal
                                sharedState={sharedState}
                            />
                            <ExportModal
                                data={data} />
                        </div>

                    </div>
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="w-full">
                    <tr>
                        <td className="text-center">
                            <div className="flex justify-center items-center mb-2">
                            </div>
                        </td>
                        {/* <td className="text-right">
                            <button onClick={exportToGraphis} className="dark:bg-gray-800 dark:hover:bg-indigo-500 hover:bg-indigo-500 bg-indigo-700 text-white font-bold py-1 px-1 rounded-full right-0 top-10">
                                <HiTable className="h-7 w-7" />
                            </button>
                        </td> */}
                    </tr>
                </table>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                        <Table.Head >
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                id
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                name
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Total records
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Pending
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Completed
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Actions
                            </Table.HeadCell>

                        </Table.Head>

                        <Table.Body>
                            {dataGraphis.map((row: any, rowIndex: any) => (
                                <>
                                    <Table.Row
                                        key={rowIndex}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-white"
                                        onClick={() => handleRowClick(rowIndex, row)}
                                    >
                                        {columnOrder.map((key) => (
                                            <Table.Cell key={key} className="py-4 px-6 font-semibold">

                                                {typeof row[key] === 'number' && row[key] <= 30 ? (
                                                    <>
                                                        <span className="bg-gray-400 text-white font-semibold px-2 py-0.5 rounded-full dark:bg-green-400 dark:text-white">
                                                            {row[key]}
                                                        </span>
                                                    </>

                                                ) : (
                                                    row[key]
                                                )}
                                            </Table.Cell>
                                        ))}
                                        <Table.Cell>
                                            <button
                                                // onClick={exportToGraphis}
                                                onClick={() => dataInject(Filtrado, row)}
                                                className="dark:bg-gray-800 dark:hover:bg-indigo-500 hover:bg-indigo-500 bg-indigo-700 text-white font-bold py-1 px-1 rounded right-0 top-10 "
                                            >
                                                <HiTable className="h-7 w-7 " />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                    {expandedRow === rowIndex && (
                                        <Table.Row className="bg-gray-100 dark:bg-gray-900" >
                                            <Table.Cell colSpan={Object.keys(row).length}>
                                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                                                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                                                        <Table.Head className="text-xs  uppercase bg-primary-500 text-white dark:bg-gray-700 dark:text-gray-400 ">
                                                            <Table.HeadCell>Id  Payroll</Table.HeadCell>
                                                            <Table.HeadCell>Fullname</Table.HeadCell>
                                                            <Table.HeadCell>Badge</Table.HeadCell>
                                                            <Table.HeadCell>reference number</Table.HeadCell>
                                                            <Table.HeadCell>Credit Total</Table.HeadCell>
                                                            <Table.HeadCell>total of unpaid installments </Table.HeadCell>
                                                            <Table.HeadCell>credit start date</Table.HeadCell>
                                                            <Table.HeadCell>credit end date</Table.HeadCell>
                                                            <Table.HeadCell>date created</Table.HeadCell>
                                                            <Table.HeadCell>Status</Table.HeadCell>
                                                            <Table.HeadCell>Print</Table.HeadCell>
                                                            <Table.HeadCell>Action</Table.HeadCell>
                                                        </Table.Head>


                                                        <Component data={row} className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hover:bg-primary-400'></Component>

                                                    </Table>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </>
                            ))}
                        </Table.Body>


                    </Table>
                </div>
            </div>

        </div>

    );
};


const Component = function (data: any) {

    interface User {
        name_: string;
        id: string;
        id_bank: string;
        badge: string;
        reference_number: string;
        active: string;
        credit_start_date: string;
        credit_end_date: string;
        status_credit: string;
        pending_payment: string;
        credit_total: string;
        total_payment: number;
        date_created: string;
        photo: string;
    }
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que recibimos', data)

    const idFilter = data.data.id;
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que que nos queda despues de filtrar', idFilter)

    const [dataGraphis, setDataGraphis] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphisRes] = await Promise.all([
                    axios.get('https://bn.glassmountainbpo.com:8080/credit/list_payrolls'),
                ]);

                setDataGraphis(graphisRes.data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredData = dataGraphis.filter(user => user.id_bank == idFilter);

    console.log('Un dolor de cabeza menos :D', filteredData);

    function goodDisplay(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-11
        const year = String(date.getUTCFullYear()).slice(-2); // Obtener los últimos 2 dígitos del año

        return `${day}/${month}/${year}`;
    }

    return (
        <>
            {filteredData.map((user, index) => (
                <Table.Row key={user.id} className="">
                    <Table.Cell className="p-4 whitespace-nowrap ">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.id}

                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className=" flex text-base font-semibold text-gray-900 dark:text-white">
                                <div className='flex realtive mr-4'
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        overflow: 'hidden',
                                        borderRadius: '20%',
                                    }}
                                >
                                    <img
                                        className='realtive'
                                        src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (user.photo !== '' ? user.photo : 'user.png')}
                                        alt="user"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />

                                </div>
                                <div className="mt-3">
                                    {user.name_}
                                </div>


                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.badge}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.reference_number}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                ${user.credit_total}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.total_payment}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.credit_start_date)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.credit_end_date)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.date_created)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">

                                {user.status_credit == 'Pending' ? <>
                                    <Badge className="bg-red-400 dark:bg-red-500 dark:text-white text-white">{user.status_credit}</Badge>
                                </> : <>
                                    <Badge className="bg-indigo-400">{user.status_credit}</Badge>
                                </>}

                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className=" whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="flex text-base font-semibold text-gray-900 dark:text-white">

                                {/* <Button className="bg-yellow-300 hover:bg-yellow-400">   <HiTable className="text-xl"></HiTable></Button> */}

                                <ListPayments data={[filteredData[index]]} id_filter={user.id} />
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="flex text-base font-semibold text-gray-900 dark:text-white">

                                <Button>Edit</Button>
                            </div>
                        </div>
                    </Table.Cell>
                </Table.Row>
            ))}
        </>
    )
}


const dataInject = (w: any, item: any) => {

    const id = item.id;
    const dataFiltrado = w;

    function goodDisplay(dateString: string | any): string {
        const date: any = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-11
        const year = String(date.getUTCFullYear()).slice(-2); // Obtener los últimos 2 dígitos del año

        return `${day}/${month}/${year}`;
    }

    const filteredData = dataFiltrado.filter((user: { id_bank: any; }) => user.id_bank == id);
    const data = filteredData;

    const convertToCSV = (data: any) => {
        const csvRows = [];
        const allHeaders = Object.keys(data[0]);
        const desiredOrder = ['id', 'name', 'badge', 'reference_number', 'credit_total', 'due', 'credit_start_date', 'credit_end_date', 'id_bank', 'name_bank', 'method_payment', 'bank_check_n', 'account_n', 'total_payment', 'status_credit', 'date_created'];

        const headers = desiredOrder.filter(header => allHeaders.includes(header));

        // Modificar las cabeceras según sea necesario
        const modifiedHeaders = headers.map(header => {
            if (header === 'date_created') {
                return header.toUpperCase(); // Convertir a mayúsculas
            } else if (header === 'bank_account') {
                return 'BANK ACCOUNT'; // Cambiar el nombre de la cabecera
            } else if (header === 'bank_check') {
                return 'BANK CHECK'; // Cambiar el nombre de la cabecera
            } else if (header === 'method') {
                return 'METHOD'; // Cambiar el nombre de la cabecera
            } else {
                return header.toUpperCase(); // Convertir a mayúsculas
            }
        });

        csvRows.push(modifiedHeaders.join(','));

        for (const row of data) {
            const values: any = headers.map(header => {
                if (header === 'credit_start_date') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                } else if (header === 'date_created') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                } else if (header === 'credit_end_date') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                } else if (header === 'date_created') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                } else if (header === 'name') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'credit_start_date') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'credit_end_date') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'name_bank') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'date_created') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                }
                else {
                    return row[header];
                }
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    // Function to export data to CSV and prompt download
    const exportToCSV = () => {
        console.log(data);

        const csvContent = convertToCSV(data);
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // Añadir BOM para Excel

        // const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'PayrollsReports.csv';
        a.click();
        window.URL.revokeObjectURL(url);

    };

    exportToCSV();
}


const AddTaskModal: FC<any> = function ({ sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
    const [supBadge, setSupBadge] = useState<any>('');
    const [result, setResult] = useState<any>([]);
    const [supervisorName, setSupervisorName] = useState('');

    const [nameBank, setNameBank] = useState('');
    const [badge, setBadge] = useState<any>(''); //Badge

    const [statusActive, setStatusActive] = useState('');

    const [acountNumber, setAcountNumber] = useState('');
    const [bankCheck, setBankCheck] = useState('');


    // Bank Check Payment
    const [bankCheckPayment, setBankCheckPayment] = useState('');
    // Bank  account n
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    // Bank List
    interface BankData {
        id: number;
        name: string;
    }
    // Bank List
    const [bankData, setBankData] = useState<BankData[]>([]);


    const [methodPayment, setMethodCategory] = useState('');
    // const [idCategory, setIdCategory] = useState('');

    console.log('estas son la categorias seleccionadas', methodPayment)

    const url = `https://bn.glassmountainbpo.com:8080/api/hired_fullname/`;

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


    //@_____________________Get  link banks _________________________

    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/inventory/listBanks')
            .then(res => {

                // Filter data where supervisorBadge equals created_user
                setBankData(res.data);

            })
    }, [sharedState, , created_user]); // Add userLevel and created_user to the dependency array



    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleTrack();
        }
    };

    const resetFields = () => {
        setNameBank('');
        setSupBadge('');
        setStatusActive('');
        setSupervisorName('');
    };

    console.log(result, supervisorName)




    const url2 = `https://bn.glassmountainbpo.com:8080/inventory/addBank`;
    const handleSubmit = async (e: React.FormEvent) => {
        if (!nameBank) {
            alert('Enter a valid category name')
        } else if (!statusActive) {
            alert('Enter a valid status!')
        } else {
            e.preventDefault()
            try {
                const response = await axios.post(url2, {
                    nameBank,
                    statusActive,
                    created_user,
                    methodPayment,
                    bankCheckPayment,
                    bankAccountNumber,
                    info
                })
                if (response.status == 200) {
                    const responseData = response.data;
                    updateSharedState(!sharedState);

                    if (responseData.message === "ok") {
                        setOpen(false);
                        resetFields();
                        alert('Brand created successfully!')
                    } else {
                        console.log("Fatal Error");
                    }
                }
            } catch (error) {
                console.log(error);
                setOpen(false)
            }
        }
    }


    // auditoria 

    interface BrowserInfo {
        browser: string;
        device: string;
        os: string;
        location: string; // Lugar que será obtenido después
    }


    const [info, setInfo] = useState<BrowserInfo>({
        browser: '',
        device: '',
        os: '',
        location: 'Unknown',
    });

    useEffect(() => {
        // Obtiene información del navegador
        const parser = new UAParser();
        const browserName = parser.getBrowser().name || 'Unknown';
        const deviceType = parser.getDevice().type || 'Unknown';
        const osName = parser.getOS().name || 'Unknown';

        // Actualiza información del navegador y dispositivo
        setInfo({
            ...info,
            browser: browserName,
            device: deviceType,
            os: osName,
        });

        // Obtiene la ubicación geográfica (si el usuario lo permite)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        location: `Lat: ${lat}, Lon: ${lon}`,
                    }));
                },
                (error) => {
                    console.error('Error obteniendo ubicación:', error);
                }
            );
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    console.log('XXXXXXXXXXXXXXXXXXXXXX info: ', info);

    const [dataInternal, setDataInternal] = useState([] as any[]);

    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/inventory/listCategory')
            .then(res => {
                // If userLevel is not 2, set data as is
                const filteredData = res.data.filter((item: { active: number; }) => item.active == 1);
                setDataInternal(filteredData);

            })
    }, [created_user]); // Add userLevel and created_user to the dependency array




    useEffect(() => {

        console.log('Nombre del bancoooo', nameBank);
        // if (nameBank === 'BANK CHECK') {
        //     setBankCheckPayment('');
        // } else if (methodPayment === 'ACCOUNT BANK NUMBER') {
        //     setBankAccountNumber('');
        // } else if (methodPayment === '') {
        //     setBankCheckPayment('');
        //     setBankAccountNumber('');
        // }
    }, [nameBank]);


    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

    // Ejemplo de cómo podrías actualizar el estado con datos de una API o alguna fuente de datos


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('data-id');
        setNameBank(e.target.value);
        setSelectedBankId(selectedId ? parseInt(selectedId, 10) : null);

        console.log('este si el banco seleccionado : ', selectedBankId);

        const filterData: any = bankData.filter((item: any) => item.id == selectedId);

        setMethodCategory(filterData[0].method);
        setAcountNumber(filterData[0].bank_account);
        setBankCheck(filterData[0].bank_check);
        console.log('estaaaa es el filtro de los bancos', filterData);
    };



    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (rowIndex: any) => {
        console.log('Clicked row index: ', rowIndex)
        setExpandedRow(rowIndex === expandedRow ? null : rowIndex);
    };





    return (
        <>
            <Button color="primary" onClick={() => { setOpen(true) }}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add Payrolls
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong >Add new payroll</strong>
                </Modal.Header>
                <Modal.Body>

                    <div className="flex ">
                        <Button className='bg-green-300' onClick={() => handleRowClick(0)}>
                            < HiIdentification className="text-2xl" />

                        </Button>
                        <strong className="text-gray-800 dark:text-gray-100 mt-2 ml-2">Personal Information</strong>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {expandedRow === 0 && (
                            <>
                                {/* Personal Information Section */}
                                <div className="col-span-1 sm:col-span-2">

                                    <div className="col-span-1 sm:col-span-2 flex justify-center">
                                        <div className="relative bg-gray-100 rounded-xl" style={{ width: '125px', height: '115px', overflow: 'hidden', borderRadius: '7.5%' }}>
                                            <img
                                                className="relative"
                                                src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (!result.photo || result.photo === 'undefined' ? 'user.png' : result.photo)}
                                                alt="user"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Label className="text-gray-800 font-extrabold" htmlFor="badge">Badge</Label>
                                        <TextInput
                                            className="mt-2"
                                            id="badgeAddUser"
                                            name="badgeAddUser"
                                            placeholder="3814"
                                            value={badge}
                                            onChange={e => setBadge(e.target.value)}
                                            onKeyDown={handleKeyPress}
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
                                            value={result.fullname}
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
                                            value={result ? result.name_job : ""}
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
                                            value={result ? result.name_rol : ""}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="name">Banks Available</Label>
                                    <div className="mt-1">
                                        <Select
                                            id="name"
                                            name="name"
                                            value={nameBank}
                                            onChange={handleSelectChange}
                                        >
                                            <option value=''>--SELECTED--</option>
                                            {bankData.sort((a, b) => a.name.localeCompare(b.name)).map((element) => (
                                                <option key={element.id} value={element.name} data-id={element.id.toString()}>{element.name}</option>
                                            ))}

                                        </Select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Payment Information Section */}
                        <div className="col-span-1 sm:col-span-2">

                            <div className="flex mt-3">
                                <Button className='bg-green-300' onClick={() => handleRowClick(3)}>
                                    < HiCreditCard className="text-2xl" />
                                </Button>
                                <strong className="text-gray-800 dark:text-gray-100 mt-3 ml-2">Payment Information</strong>
                            </div>

                            {expandedRow === 3 && (<>

                                <div className=" mt-2 grid grid-cols-1 sm:grid-cols-1 gap-1">
                                    <div>

                                        <Alert color="success" className="mt-1" >
                                            Method Payment: {methodPayment}<br></br>
                                            <span></span>
                                        </Alert>
                                    </div>
                                    <div>
                                        <div className="mt-">

                                            <Alert className="mt- bg-black-500" color="success">
                                                Bank Account Number: {acountNumber}<br></br>
                                                <span></span>
                                            </Alert>
                                        </div>

                                    </div>

                                </div>

                            </>)}

                        </div>

                        {/* Payment due */}

                        <div className="col-span-1 sm:col-span-2">
                            <div className="flex">
                                <Button className='bg-green-300' onClick={() => handleRowClick(1)}>
                                    <HiOutlineCurrencyDollar className="text-2xl" />
                                </Button>
                                <strong className="text-gray-800 dark:text-gray-100 mt-2 ml-2">Credit information</strong>
                            </div>
                            <div>
                                {expandedRow === 1 && (
                                    <div>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <Label htmlFor="status">Status</Label>
                                                    <div className="mt-1">
                                                        <Select
                                                            id="status"
                                                            name="status"
                                                            value={statusActive}
                                                            onChange={(e) => setStatusActive(e.target.value)}
                                                        >
                                                            <option value="">Selected</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="adminUser">Admin User</Label>
                                                    <div className="mt-1">
                                                        <TextInput
                                                            id="supBadge"
                                                            name="supBadge"
                                                            placeholder="3814"
                                                            value={created_user}
                                                            onChange={(e) => setSupBadge(e.target.value)}
                                                            onKeyDown={handleKeyPress}
                                                            required
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                        {/* User Status Section */}

                        <div className="col-span-1 sm:col-span-2">
                            {/* <strong className="text-gray-800 dark:text-gray-100">User Status</strong> */}
                            <div className="flex">
                                <Button className='bg-green-300' onClick={() => handleRowClick(4)}>
                                    <HiOutlineUserCircle className="text-2xl" />
                                </Button>
                                <strong className="text-gray-800 dark:text-gray-100 mt-2 ml-2">Created by user</strong>
                            </div>
                            <div className="mt-2">
                                {expandedRow === 4 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
                                        <div>
                                            <div className="mt-1">

                                                <Alert className="items-center text-3xl font-extrabold" 
                                                >
                                            <Label htmlFor="status" className="mr-2 dark:text-indigo-500 font-extrabold">Badge:</Label>
                                                    {created_user}
                                                </Alert>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        color="primary"
                        onClick={(e) => { handleSubmit(e) }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};





const ListPayments: FC<any> = function ({ data, id_filter }: any) {

    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', id_filter)
    const [isOpen, setOpen] = useState(false);
    const [supBadge, setSupBadge] = useState<any>('');
    const [result, setResult] = useState<any>([]);
    const [supervisorName, setSupervisorName] = useState('');

    const [name, setName] = useState(data[0].name);
    const [statusActive, setStatusActive] = useState('');

    // Bank Check Payment
    const [bankCheckPayment, setBankCheckPayment] = useState('');
    // Bank  account n
    const [bankAccountNumber, setBankAccountNumber] = useState('');



    const [methodPayment, setMethodCategory] = useState('');
    // const [idCategory, setIdCategory] = useState('');

    const cpm = data;


    console.log('estas son la categorias seleccionadas', methodPayment)
    console.log('esto es nuestro recurso', data)


    const urlHired = `https://bn.glassmountainbpo.com:8080/api/hired/`;

    const handleTrack = () => {
        if (supBadge.length !== 0) {
            axios.get(urlHired + supBadge)
                .then((response => {
                    setResult(response.data);
                    const data = response.data;
                    if (data.first_name !== undefined) {
                        setSupervisorName(data.first_name + " " + data.second_name + " " + data.first_last_name + " " + data.second_last_name);
                    } else {
                        setSupervisorName('');
                    }
                }));
        }
    };

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleTrack();
        }
    };


    const resetFields = () => {
        setName('');
        setSupBadge('');
        setStatusActive('');
        setSupervisorName('');
    };

    console.log(result, supervisorName)




    const url2 = `https://bn.glassmountainbpo.com:8080/inventory/addBank`;
    // const handleSubmit = async (e: React.FormEvent) => {
    //     if (!name) {
    //         alert('Enter a valid category name')
    //     } else if (!statusActive) {
    //         alert('Enter a valid status!')
    //     } else {
    //         e.preventDefault()
    //         try {
    //             const response = await axios.post(url2, {
    //                 name,
    //                 statusActive,
    //                 created_user,
    //                 methodPayment,
    //                 bankCheckPayment,
    //                 bankAccountNumber,
    //                 info
    //             })
    //             if (response.status == 200) {
    //                 const responseData = response.data;
    //                 // updateSharedState(!sharedState);

    //                 if (responseData.message === "ok") {
    //                     setOpen(false);
    //                     resetFields();
    //                     alert('Brand created successfully!')
    //                 } else {
    //                     console.log("Fatal Error");
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             setOpen(false)
    //         }
    //     }
    // }



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let reportUrl = '';

        reportUrl = `https://bn.glassmountainbpo.com:8080/creditControl/reportTwo/${data[0].badge}`;

        try {
            const response = await axios.get(reportUrl);
            const data = response.data;
            const csv = jsonToCsv(data);
            downloadCsv(csv, `Payment_report_${data[0].badge}.csv`);
        } catch (error) {
            console.error('Error fetching the report:', error);
        }
    };


    const handleSubmit2 = async (e: any) => {
        e.preventDefault();
        let reportUrl = '';
        reportUrl = `https://bn.glassmountainbpo.com:8080/creditControl/reportOne/${data[0].badge}`;
        try {
            const response = await axios.get(reportUrl);
            const data = response.data;
            const csv = jsonToCsv(data);
            downloadCsv(csv, `Payment_report_${data[0].badge}.csv`);
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


    // auditoria 

    interface BrowserInfo {
        browser: string;
        device: string;
        os: string;
        location: string; // Lugar que será obtenido después
    }


    const [info, setInfo] = useState<BrowserInfo>({
        browser: '',
        device: '',
        os: '',
        location: 'Unknown',
    });

    useEffect(() => {
        // Obtiene información del navegador
        const parser = new UAParser();
        const browserName = parser.getBrowser().name || 'Unknown';
        const deviceType = parser.getDevice().type || 'Unknown';
        const osName = parser.getOS().name || 'Unknown';

        // Actualiza información del navegador y dispositivo
        setInfo({
            ...info,
            browser: browserName,
            device: deviceType,
            os: osName,
        });

        // Obtiene la ubicación geográfica (si el usuario lo permite)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setInfo((prevInfo) => ({
                        ...prevInfo,
                        location: `Lat: ${lat}, Lon: ${lon}`,
                    }));
                },
                (error) => {
                    console.error('Error obteniendo ubicación:', error);
                }
            );
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    console.log('XXXXXXXXXXXXXXXXXXXXXX info: ', info);

    const [dataInternal, setDataInternal] = useState([] as any[]);

    useEffect(() => {
        axios.get('https://bn.glassmountainbpo.com:8080/inventory/listCategory')
            .then(res => {
                // If userLevel is not 2, set data as is
                const filteredData = res.data.filter((item: { active: number; }) => item.active == 1);
                setDataInternal(filteredData);

            })
    }, [created_user]); // Add userLevel and created_user to the dependency array




    useEffect(() => {
        if (methodPayment === 'BANK CHECK') {
            setBankCheckPayment('');
        } else if (methodPayment === 'ACCOUNT BANK NUMBER') {
            setBankAccountNumber('');
        } else if (methodPayment === '') {
            setBankCheckPayment('');
            setBankAccountNumber('');
        }
    }, [methodPayment]);



    return (
        <>
            {/* <Button color="primary" onClick={() => { setOpen(true) }}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add Payrolls
                </div>
            </Button> */}
            <Button className="bg-yellow-300 hover:bg-yellow-400" onClick={() => { setOpen(true) }}>   <HiTable className="text-xl"></HiTable></Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} className="w-full sm:grid-cols-3">
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700 text-gray-200">
                    <strong>Payment management!</strong>
                </Modal.Header>
                <Modal.Body>
                    {/*      
                    <div className="overflow-x-auto mt-5 bg-gray-100 rounded-md">
                        <h3 className=" ml-5 text-1sm" >Detalle de pago</h3>
                    </div> */}
                    <div className="overflow-x-auto mt-0 bg-gray-100 rounded-md">
                        <Card className="max-w-auto">
                            <div className="flex">
                                <div className='realtive mr-4'
                                    style={{
                                        width: '125px',
                                        height: '95px',
                                        overflow: 'hidden',
                                        borderRadius: '20%',
                                    }}
                                >
                                    <img
                                        className='realtive'
                                        src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (data[0].photo !== '' ? data[0].photo : 'user.png')}
                                        alt="user"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>

                                <h5 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">{data[0].name_}</h5>
                                <h5 className="mb-1 text-right text-2xl font-bold text-gray-700 dark:text-white pl-2">Badge: {data[0].badge}</h5>

                            </div>
                            <h6 className="mb-1 text-1xl font-bold text-gray-900 dark:text-white">Bank Name: {data[0].name_bank}</h6>
                            <p className="mb-1 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                Method Payment: {data[0].method_payment}
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Check Number: {data[0].bank_check_n}
                                </p>
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Number Account: {data[0].account_n}
                                </p>
                            </p>
                            <h6 className="mb-2 text-1xl font-bold text-gray-900 dark:text-white">Details</h6>
                            <p className="mb-5 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                Reference Number: {data[0].reference_number}
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Due: ${data[0].due}
                                </p>
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Active: {data[0].active == "1" ? "Yes" : "No"}
                                </p>
                                <div className="flex">
                                    <p className=" flex mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                        Credit Status {data[0].status_credit == 'Pending' ? <>
                                            <a className="ml-2 mr-4 px-2 py-1 font-bold  rounded-full bg-yellow-300 text-gray-700 flex text-sm">{data[0].status_credit}</a>
                                        </> : <>
                                            <a className="ml-2 mr-4 px-2 py-1 font-bold  rounded-full bg-green-500 text-white flex text-sm">{data[0].status_credit}</a>
                                        </>}
                                    </p>
                                </div>
                            </p>

                            <div className="items-center pt-7 justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                                <a
                                    href="#"
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-12 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                                    onClick={(e) => { handleSubmit2(e) }}
                                >

                                    <div className="text-left">
                                        <div className="mb-1 text-sm">Credit Total</div>
                                        <div className="-mt-1 font-sans text-1xl font-semibold">${data[0].credit_total}</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-12 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
                                    onClick={(e) => { handleSubmit(e) }}
                                >
                                    <div className="text-left">
                                        <div className="mb-1 text-sm">Pending Payment
                                        </div>
                                        <div className="-mt-1 ml-9 font-sans text-1xl font-semibold">{data[0].pending_payment}</div>
                                    </div>
                                </a>
                            </div>
                        </Card>
                    </div>


                </Modal.Body>
                {/* <Modal.Footer>
                    <Button
                        color="primary"
                        onClick={(e) => { handleSubmit(e) }}>
                        Save
                    </Button>
                </Modal.Footer> */}
            </Modal >
        </>
    );
};





const ExportModal: FC<any> = function (rawData) {
    const [isOpen, setOpen] = useState(false);



    function goodDisplay(dateString: string | any): string {
        const date: any = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-11
        const year = String(date.getUTCFullYear()).slice(-2); // Obtener los últimos 2 dígitos del año

        return `${day}/${month}/${year}`;
    }


    interface User {
        name: string;
        id: string;
        id_bank: string;
        badge: string;
        reference_number: string;
        active: string;
        credit_start_date: string;
        credit_end_date: string;
        status_credit: string;
        pending_payment: string;
        credit_total: string;
        total_payment: number;
        date_created: string;
        date: string;
    }

    const [dataGraphis, setDataGraphis] = useState<User[]>([]);


    const data = dataGraphis;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphisRes] = await Promise.all([
                    axios.get('https://bn.glassmountainbpo.com:8080/credit/list_payrolls'),
                ]);

                setDataGraphis(graphisRes.data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const convertToCSV = (data: any) => {
        const csvRows = [];
        const allHeaders = Object.keys(data[0]);
        const desiredOrder = ['id', 'name', 'badge', 'reference_number', 'credit_total', 'due', 'credit_start_date', 'credit_end_date', 'id_bank', 'name_bank', 'method_payment', 'bank_check_n', 'account_n', 'total_payment', 'status_credit', 'date_created'];

        const headers = desiredOrder.filter(header => allHeaders.includes(header));

        // Modificar las cabeceras según sea necesario
        const modifiedHeaders = headers.map(header => {
            if (header === 'date_created') {
                return header.toUpperCase(); // Convertir a mayúsculas
            } else if (header === 'bank_account') {
                return 'BANK ACCOUNT'; // Cambiar el nombre de la cabecera
            } else if (header === 'bank_check') {
                return 'BANK CHECK'; // Cambiar el nombre de la cabecera
            } else if (header === 'method') {
                return 'METHOD'; // Cambiar el nombre de la cabecera
            } else {
                return header.toUpperCase(); // Convertir a mayúsculas
            }
        });

        csvRows.push(modifiedHeaders.join(','));

        for (const row of data) {
            const values: any = headers.map(header => {
                if (header === 'credit_start_date') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                    // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                } else if (header === 'date_created') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                } else if (header === 'credit_end_date') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                } else if (header === 'date_created') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                } else if (header === 'name') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'credit_start_date') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'credit_end_date') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'name_bank') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else if (header === 'date_created') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    const date = new Date(row[header]);
                    return goodDisplay(date)
                }
                else {
                    return row[header];
                }
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };




    // Function to export data to CSV and prompt download
    const exportToCSV = () => {
        console.log(data);

        const csvContent = convertToCSV(data);
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // Añadir BOM para Excel

        // const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'PayrollsReports.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        setOpen(false);
    };


    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-indigo-600 hover:bg-indigo-800 dark:bg-indigo-900 dark:hover-bg-indigo-500" >
                <div className="flex items-center gap-x-3 ">
                    <HiDocumentDownload className="text-xl" />
                    <span>Export</span>
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Export Payrolls</strong>
                </Modal.Header>
                <Modal.Body className="flex flex-col items-center gap-y-6 text-center">
                    <div className="flex items-center gap-x-3">
                        <div>
                            <Button onClick={exportToCSV} color="light">
                                <div className="flex items-center gap-x-3">
                                    <FiletypeCsv className="text-xl" />
                                    <span>Export CSV</span>
                                </div>
                            </Button>
                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </>
    )

}




export default PayrollAll;