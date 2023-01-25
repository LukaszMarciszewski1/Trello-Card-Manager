import React, { useEffect, useState } from 'react'
import axios from "axios";
import dayjs from "dayjs";

import List from 'components/templates/List/List'
import Task from 'components/templates/Task/Task'
import { Card } from 'models/card';
import { BsChevronDoubleLeft } from 'react-icons/bs';

const ListTasks = () => {
  dayjs.locale("pl");
  const [tasks, setTasks] = useState([] as Card[])
  const trelloUrl = 'https://api.trello.com/1'

  const getTasks = async () => {
    const config = {
      params: {
        key: process.env.REACT_APP_TRELLO_KEY,
        token: process.env.REACT_APP_TRELLO_TOKEN,
      },
      headers: {
        Accept: "application/json"
      },
    }

    try {
      const res = await axios.get(`${trelloUrl}/boards/637cee367bbccd03b06d530c/cards/all`, {
        method: 'GET',
        params: {
          key: process.env.REACT_APP_TRELLO_KEY,
          token: process.env.REACT_APP_TRELLO_TOKEN,
        },
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          );
          setTasks(response.data)
        })

    } catch (error) {
      console.error(error);
    }
  };

  const getBoardName = async (id: any) => {
    let name
    try {
      const res = await axios.get(`${trelloUrl}/boards/${id}/name`, {
        method: 'GET',
        params: {
          key: process.env.REACT_APP_TRELLO_KEY,
          token: process.env.REACT_APP_TRELLO_TOKEN,
        },
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          console.log(
            `Response: ${response.status} ${response.statusText}`
          );
          // console.log(response.data._value)
        })
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   getTasks()
  //   getBoardName('637cee367bbccd03b06d530c')
  // }, [])



  const showDate = (date: any) => {
    const due = date !== null ? dayjs(date).format('DD-MM-YYYY') : 'Brak daty'
    return due
  }

  return (
    // <List
    //   data={tasks}
    //   sortProducts={setTasks}
    // >
    //   {
    //     tasks?.slice(0).reverse().map((product: any) => (
    //       <Task
    //         key={product.id}
    //         title={product.name}
    //         endDate={showDate(product.due)}
    //         board={product.board}
    //       />
    //     ))
    //   }
    // </List>
    <div>Lista</div>
  )
}

export default ListTasks