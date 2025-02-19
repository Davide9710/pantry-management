'use client'
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, query, setDoc, doc, deleteDoc, count } from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [item, setItem] = useState({name: "", count: 0}) 

  const updatePantry = async() => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot);
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id);
    })
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])
  
  const addItem = async (item) => {
    const docRef = doc(firestore, "pantry", item.name)
    await setDoc(docRef, {count : item.count})
    updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(firestore, "pantry", item)
    await deleteDoc(docRef)
    updatePantry()
  }

  const setItemName = async (item) => {
    this.item.name = item.name
  }

  const setItemCount = async (item) => {
    this.item.count = item.count
  }

  return (
    <Box
      width="100vw" 
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pantry item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
          <TextField 
            id="outlined-basic" 
            label="itemName" 
            variant="outlined" 
            fullWidth 
            value={item.name}
            onChange={(e) => {setItem(e.target.value)}}
          />
          <TextField 
            id="outlined-basic" 
            label="itemCount" 
            variant="outlined" 
            fullWidth 
            value={item.count}
            onChange={(e) => {setItemName(e.target.value)}}
          />
          <Button variant="contained"
            onClick = {() => {
              addItem(itemName)
              setItemName("")
              handleClose()
            }}
          >Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="contained" 
        onClick={handleOpen}
      >Add Item</Button>
      <Box border={'1px solid #333'}>
        <Box 
          width={'800px'} 
          height={'100px'} 
          bgcolor={"#add8e6"} 
          display={"flex"} 
          justifyContent={"center"} 
          alignItems={"center"}
        >
          <Typography variant="h2" color="#333" textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack 
          width="800px" 
          height="300px" 
          spacing={2} 
          overflow={'auto'}
        >
          {pantry.map((item) => (
            <Stack key={item} 
              direction={'row'} 
              spacing={2} 
              justifyContent={"center"} 
              alignContent={'space-between'}
            >
              <Box 
                key={item}
                width="100%"
                minHeight="150px"
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                bgcolor={'#f0f0f0'}
              >
                <Typography
                  variant="h3"
                  color={'#333'}
                  textAlign={'center'}
                >
                  {
                    item.charAt(0).toUpperCase() + item.slice(1)
                  }
                </Typography>
              </Box>
              <Button variant="contained" onClick = {() => removeItem(item)}>
                Remove
              </Button>
            </Stack>
          ))}
          
        </Stack>
      </Box>
    </Box>
  );
}
