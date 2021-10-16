import React, { useState } from 'react';
import { 
  StatusBar, NativeBaseProvider, Box, HStack, VStack, Text, Heading, Input, IconButton, Icon, Checkbox, View, Button
} from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask = (titleTask) => {
    let temp = tasks
    let objState = {
        title: titleTask,
        isCompleted: false
    }
    temp.push(objState)
    setTasks(temp)
  }

  const handleStatus = (idx) => {
    let temp = tasks.map((task, taskIndex) => (
      taskIndex !== idx 
      ? task 
      : {
        ...task,
        isCompleted: !task.isCompleted
      }
    ))
    setTasks(temp)
  }

  const handleDelete = (idx) => {
    const temp = tasks.filter((item, index) => index !== idx).map(({title, isCompleted}) => ({title, isCompleted}))
    setTasks(temp)
  }

  const deleteSelected = () => {
    const temp = tasks
    const selected = tasks.filter((item) => item.isCompleted === true)
    const newArray = temp.filter( item => {
      return selected.some( select => {
        return select.isCompleted !== item.isCompleted
      })
    })
    setTasks(newArray)
    console.log(newArray)
  }

  const checkSelected = () => {
    return tasks.some((item) => item.isCompleted === true)
  }

  const valueSelected = () => {
    return tasks.filter((item) => item.isCompleted === true).length
  }

  return (
    <NativeBaseProvider>
      <Box px={5} py={5} flex={1}>
        <Heading mb={5} color="blue.400">Wishlist</Heading>
        <VStack>
          <HStack>
            <Input
              type="text"
              overflow="visible"
              flex={1}
              placeholder="Item Baru"
              onChangeText={text => setInput(text)}
              value={input}
              InputRightElement={
                <IconButton
                  borderRadius="sm"
                  icon={
                    <Icon 
                      as={FontAwesome5} 
                      name="plus" 
                      size="xs"
                      color="trueGray.700"/>
                  }
                  onPress={() => {
                    addTask(input)
                    setInput('')
                  }}
                />
              }
            />
          </HStack>
          <VStack mt={5}>
            <View>
              {
                tasks.map((task, idx) => (
                  <HStack
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                    key={idx}
                  >
                    <Checkbox 
                      value={task.title}
                      isChecked={task.isCompleted}
                      onChange={() => handleStatus(idx) }
                    >
                      <Text ml={2} strikeThrough={task.isCompleted} color={!task.isCompleted ? "trueGray.700" : "trueGray.400"} >{task.title}</Text>
                    </Checkbox>
                    <IconButton
                      size="sm"
                      colorScheme="trueGray"
                      mr={1}
                      icon={
                        <Icon 
                          as={FontAwesome5} 
                          name="trash" 
                          size="xs"
                          color="trueGray.700"/>
                      }
                      onPress={() => handleDelete(idx) }
                    />
                  </HStack>
                ))
              }
              {
                tasks.length > 0 
                ? <Button isDisabled={!checkSelected()} onPress={() => deleteSelected()}>
                    {
                      valueSelected() < 1 ? 
                      <Text>
                        Delete Selected
                      </Text> :
                      <Text color="white">
                        Delete Selected [{valueSelected()}] list
                      </Text>
                    }
                  </Button>
                : <></>
              }
            </View>
          </VStack>
        </VStack>
      </Box>
      <StatusBar />
    </NativeBaseProvider>
  );
}
