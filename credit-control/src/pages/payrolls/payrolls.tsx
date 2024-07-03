/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Modal,
    Select,
    Table,
    TextInput,
    Button,
    Label
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



    // const [dataGraphis, setDataGraphis] = useState([]);

    // const dataGraphis: User[] = [
    //     // Suponiendo que tus datos de usuario están aquí
    //   ];

    interface User {
        name: string;
        id: string;
        // Añade otras propiedades que cada usuario pueda tener
    }

    const [dataGraphis, setDataGraphis] = useState<User[]>([]);

    // const [dataTotal, setDataTotal] = useState<totalSummary>({ total: '' });


    const [data, setData]: any = useState([]);
    const [activeLink, setActiveLink] = useState('');


    useEffect(() => {

    }, [activeLink]);

    const handleSetActiveLink = (link: any) => {
        setActiveLink((prevLink) => (prevLink === link ? '' : link));
    };

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



    const getCurrentDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    };




    const exportToGraphis = () => {
        // Encabezados originales
        const originalHeaders: any = Object.keys(dataGraphis[0]);

        // Convertir todos los encabezados a mayúsculas y agregar la nueva columna para la fecha del reporte
        const headers: any = [...originalHeaders.map((header: string) => header.toUpperCase()), 'DATE_REPORT']; // Fecha al final

        // Obtener la fecha actual
        const currentDate = getCurrentDate();

        // Convertir los datos a un formato adecuado para xlsx, incluyendo la nueva columna de fecha
        const formattedData: any = dataGraphis.map(row => {
            let formattedRow: any = {
                'DATE_REPORT': currentDate // Nueva columna con la fecha actual
            };
            originalHeaders.forEach((header: any) => {
                formattedRow[header.toUpperCase()] = row[header]; // Usar los nombres de los encabezados originales en mayúsculas como claves
            });
            return formattedRow;
        });

        // Crear la hoja de cálculo
        const ws = utils.json_to_sheet(formattedData);

        // Agregar encabezados a la hoja de cálculo manualmente
        utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });

        // Aplicar estilos a los encabezados
        headers.forEach((header: any, index: any) => {
            const cellAddress = utils.encode_cell({ r: 0, c: index }); // Celda en la primera fila (0) y columna correspondiente (index)
            if (!ws[cellAddress]) ws[cellAddress] = {}; // Asegúrate de que la celda existe
            ws[cellAddress].s = {
                fill: {
                    fgColor: { rgb: "000000" } // Fondo negro
                },
                font: {
                    color: { rgb: "FFFFFF" }, // Texto blanco
                    bold: true // Texto en negrita para mayor claridad
                },
                alignment: {
                    horizontal: 'center', // Alineación horizontal
                    vertical: 'center' // Alineación vertical
                }
            };
        });

        // Ajustar el tamaño de las columnas al contenido
        const columnWidths = headers.map(header => ({ wch: header.length + 5 })); // Ajusta según sea necesario
        ws['!cols'] = columnWidths;

        // Crear el libro de trabajo
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Data');

        // Guardar el archivo Excel
        writeFile(wb, 'dataGraphis_export.xlsx');
    };

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
                                                {row[key]} {/* Accede al valor de cada clave según el orden definido */}
                                            </Table.Cell>
                                        ))}
                                        <Table.Cell>
                                            <button
                                                onClick={exportToGraphis}
                                                className="dark:bg-gray-800 dark:hover:bg-indigo-500 hover:bg-indigo-500 bg-indigo-700 text-white font-bold py-1 px-1 rounded-full right-0 top-10"
                                            >
                                                <HiTable className="h-7 w-7" />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                    {expandedRow === rowIndex && (
                                        <Table.Row className="bg-gray-100 dark:bg-gray-900">
                                            <Table.Cell colSpan={Object.keys(row).length}>
                                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                                                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                                                        <Table.Head className="text-xs text-gray-700 uppercase bg-green-400 dark:bg-gray-700 dark:text-gray-400 ">
                                                            <Table.HeadCell>Id  Payroll</Table.HeadCell>
                                                            <Table.HeadCell>Fullname</Table.HeadCell>
                                                            <Table.HeadCell>Badge</Table.HeadCell>
                                                            <Table.HeadCell>reference number</Table.HeadCell>
                                                            <Table.HeadCell>Credit Total</Table.HeadCell>
                                                            <Table.HeadCell>total unpaid installments</Table.HeadCell>
                                                            <Table.HeadCell>credit start date</Table.HeadCell>
                                                            <Table.HeadCell>credit end date</Table.HeadCell>
                                                            <Table.HeadCell>date created</Table.HeadCell>
                                                            <Table.HeadCell>Status</Table.HeadCell>
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
        name: string;
        id: string;
        // Añade otras propiedades que cada usuario pueda tener
    }
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que recibimos', data)
    
    const idFilter =  data.data.id;
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que que nos queda despues de filtrar', idFilter)

    const [dataGraphis, setDataGraphis] = useState<User[]>([]);

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
    }, []);

    const filteredData = dataGraphis.filter(user => user.id == idFilter);


    return (
        <>
            {filteredData .map((user, index) => (
                <Table.Row key={user.id}>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.id }
                               
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.name}
                            </div>
                        </div>
                    </Table.Cell>
                </Table.Row>
            ))}
        </>
    )





}


const AddTaskModal: FC<any> = function ({ sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
    const [supBadge, setSupBadge] = useState<any>('');
    const [result, setResult] = useState<any>([]);
    const [supervisorName, setSupervisorName] = useState('');

    const [name, setName] = useState('');
    const [statusActive, setStatusActive] = useState('');

    // Bank Check Payment
    const [bankCheckPayment, setBankCheckPayment] = useState('');
    // Bank  account n
    const [bankAccountNumber, setBankAccountNumber] = useState('');



    const [methodPayment, setMethodCategory] = useState('');
    // const [idCategory, setIdCategory] = useState('');

    console.log('estas son la categorias seleccionadas', methodPayment)


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
    const handleSubmit = async (e: React.FormEvent) => {
        if (!name) {
            alert('Enter a valid category name')
        } else if (!statusActive) {
            alert('Enter a valid status!')
        } else {
            e.preventDefault()
            try {
                const response = await axios.post(url2, {
                    name,
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
            <Button color="primary" onClick={() => { setOpen(true) }}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add Bank
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen}>
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Add new bank!</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e)}
                                >

                                </TextInput>

                            </div>
                        </div>
                        <div>

                            <Label htmlFor="vendor">Method Payment</Label>
                            <div className="mt-1">
                                <Select onChange={(e) => {
                                    // const selectedIndex = e.target.selectedIndex;
                                    const selectedMethod = e.target.value;
                                    setMethodCategory(selectedMethod);
                                    // setIdCategory(dataInternal[selectedIndex].id);
                                }}>

                                    <option value="">SELECTED</option>
                                    <option value="BANK CHECK">BANK CHECK</option>
                                    <option value="ACCOUNT BANK NUMBER">ACCOUNT BANK NUMBER</option>

                                </Select>

                            </div>

                        </div>
                        <div>
                            <Label htmlFor="check">Bank Check Payment</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="check"
                                    name="check"
                                    value={bankCheckPayment}
                                    onChange={(e) => {
                                        if (methodPayment !== 'ACCOUNT BANK NUMBER' && methodPayment !== '') {
                                            setBankCheckPayment('BANK CHECK');
                                            setBankAccountNumber('');
                                        }
                                    }}
                                    readOnly={methodPayment === 'ACCOUNT BANK NUMBER' || methodPayment === ''}
                                    disabled={methodPayment === 'ACCOUNT BANK NUMBER' || methodPayment === ''}
                                >
                                </TextInput>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="bank">Bank Account Number</Label>
                            <div className="mt-1">
                                <TextInput
                                    id="bank"
                                    name="bank"
                                    value={bankAccountNumber}
                                    onChange={(e) => {
                                        if (methodPayment !== 'BANK CHECK' && methodPayment !== '') {
                                            setBankAccountNumber(e.target.value);
                                            setBankCheckPayment('');
                                        }
                                    }}
                                    readOnly={methodPayment === 'BANK CHECK' || methodPayment === ''}
                                    disabled={methodPayment === 'BANK CHECK' || methodPayment === ''}
                                >
                                </TextInput>
                            </div>
                        </div>
                        <div>

                            <Label htmlFor="vendor">Status</Label>
                            <div className="mt-1">
                                <Select
                                    id="vendor"
                                    name="vendor"
                                    value={statusActive}
                                    onChange={(e) => setStatusActive(e.target.value)}
                                >
                                    <option value={""}>Selected</option>
                                    <option value={"1"}>Active</option>
                                    <option value={"0"}>Inactive</option>
                                </Select>
                            </div>

                        </div>
                        <div>
                            <div>
                                <Label htmlFor="period">Admin User</Label>
                                <div className="mt-1">
                                    <TextInput
                                        id="supBadge"
                                        name="supBadge"
                                        placeholder="3814"
                                        value={created_user}
                                        onChange={(e) => setSupBadge(e.target.value)}
                                        onKeyDown={(e) => handleKeyPress(e)}
                                        required
                                        readOnly

                                    />
                                </div>
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





const ExportModal: FC<any> = function (rawData) {
    const [isOpen, setOpen] = useState(false);
    const data = rawData.data;


    const convertToCSV = (data: any) => {
        const csvRows = [];
        const allHeaders = Object.keys(data[0]);
        const desiredOrder = ['id', 'name', 'method', 'bank_account', 'bank_check', 'active', 'date_created'];

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
            const values = headers.map(header => {
                if (header === 'date_created') {
                    // Formatear las fechas como dd/mm/yyyy
                    const date = new Date(row[header]);
                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                } else if (header === 'name') {
                    // Formatear los ID Groups como "400 - 401 - 402 - 403 - 404"
                    return row[header].split(',').join(' - ');
                } else {
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
        a.download = 'banksReports.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        setOpen(false);
    };

    // Function to convert an array to an XLS file
    const exportToXLS = () => {
        console.log(data);
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'CardsReports.xlsx');
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="bg-indigo-800 hover:bg-indigo-700 dark:bg-indigo-900 dark:hover-bg-indigo-500" >
                <div className="flex items-center gap-x-3 ">
                    <HiDocumentDownload className="text-xl" />
                    <span>Export</span>
                </div>
            </Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong>Export users</strong>
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
                        <div>
                            <Button onClick={exportToXLS} color="light">
                                <div className="flex items-center gap-x-3">
                                    <FiletypeXlsx className="text-xl" />
                                    <span>Export XLSX</span>
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