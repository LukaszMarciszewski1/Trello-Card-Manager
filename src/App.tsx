import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "components/layouts/AppLayout/AppLayout";
import * as constants from 'constants/index';
import { TrelloApiContextProvider } from "context/TrelloApiContext";
import {  AuthContext } from "context/AuthContext";
import Tabs from "components/organisms//Tabs/Tabs";
import TabsContent from "components/organisms//Tabs/TabsContent/TabsContent";
import Navbar from "components/organisms/Navbar/Navbar";
import TaskList from "views/TasksList";
import TaskForms from "views/TaskForms";
import Login from "views/Login/Login";
import { AuthContextProvider } from 'context/AuthContext';
import { useContext, useEffect } from "react";

function App() {
  const { user }  = useContext(AuthContext);

  const navigate = useNavigate()
  console.log(user)

  if(user){
    console.log('true')
  } else{
    console.log('false')
  }

  // Check if the current user exists on the initial render.
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return user ? <>{children}</> : <Navigate to="/login" />
  };

  return (
    <AuthContextProvider>
      <Routes>
        {/* <Route path="/"> */}
          <Route index path="/login" element={<Login />} />
          <Route
            path="/"
            element={ user ? (
              // <ProtectedRoute>
                <TrelloApiContextProvider>
                  <Layout>
                    <Navbar />
                    <Tabs>
                      <TabsContent title={constants.ADD_TASK_TAB}>
                        <TaskForms />
                      </TabsContent>
                      <TabsContent title={constants.TASKS_LIST_TAB}>
                        <TaskList />
                      </TabsContent>
                    </Tabs>
                  </Layout>
                </TrelloApiContextProvider>
              // </ProtectedRoute>
            ) : <Login />
            }
          />
        {/* </Route> */}
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
