import axiosInstance from '@/libs/request';
import { Alert, Box, CircularProgress } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const AtpFormContext = createContext();

const ATPFormProvider = ({ children }) => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
       
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    

    const fetchTournamentData = async () => {
        try {
            const response = await axiosInstance.get(`/api/tournament-view/${tournament_id}`, {
                params: {
                    user_form_id: user_form_id
                }
            });
            setTournamentData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchFormData = async () => {
        try {
            const response = await axiosInstance.get(`/api/form-view/${params.id}`, {
                params: {
                    user_form_id: user_form_id
                }
            });
            setFormData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const getTourSetupData = async () => {
        try {
            await axiosInstance.get(
                `/api/get-tour-setup-data`,
                {
                    params: {
                        tournament_id: tournament_id,
                        form_id: params.id,
                        user_form_id: user_form_id,
                        user_id: user.id,
                    }
                }
            ).then(response => {
                setTourSetupData(response.data)
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (tournament_id && user_form_id && user) {
            fetchFormData();
            fetchTournamentData();
            getTourSetupData();
        }
    }, [tournament_id, user_form_id, user])

    if (loading) {
        return (
            <Box>
                <CircularProgress />
                Loading...
            </Box>
        )
    };

    if (error) {
        return (
            <Alert sx={{ mt: 4 }} variant="outlined" color="error" onClose={() => setError("")}>
                {error}
            </Alert>
        );
    }

    const changeStatus = async (finished = null) => {
        try {
            if (user?.id) {
                const { data } = await axiosInstance.post(
                    `/api/admin_change_form_status`,
                    {
                        status: finished ? "completed" : "started",
                        user_form_id: user_form_id,
                    }

                );

                if (finished) {
                    router.push("/");
                }
            } else {
                const { data } = await axiosInstance.post(`/api/change_form_status`, {
                    status: finished ? "completed" : "started",
                    user_form_id: user_form_id,
                });

                if (finished) {
                    router.push("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };
    // const router=useRouter();
    const HandleDeleteSpecificRow = async (rowId) => {
        // setTableValue(true);
        //call api delete answer of row
        // Sample data (assuming this is assigned to a variable named `data`)
        
        try {
          console.log("try satat");
          
        //   if (user.id) {
            console.log("user?.id",user?.id);
            console.log("form_id", params.id,
                "user_form_id", user_form_id,
                // "user_id", user.id,
                "rowId",rowId);
            
            const { dataa } = await axiosInstance.post(
              `/api/delete_row_table`,
              {"form_id": params.id,
                "user_form_id": user_form_id,
                "user_id": user?.id,
                "rowId":rowId}
            ).then((data)=>{
              setTableValue(true);
            })
            if (dataa.status === 200) {
                // router.refresh();
              setTableValue(true);
           
            }
            
        } catch (error) { 
          console.log("catch run error occ ures during calling api ");
          
        }
        router.refresh();
        
    }


   

    return (
        <AtpFormContext.Provider value={{ formData, tournamentData, tourSetupData, changeStatus,HandleDeleteSpecificRow }}>
            {children}
        </AtpFormContext.Provider>
    );
};

export default ATPFormProvider;