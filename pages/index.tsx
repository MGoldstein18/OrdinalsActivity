import React, { useState } from 'react';
import {
  Button,
  Input,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<null | any>(null);

  const search = async () => {
    const response = await fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify({
        address
      })
    });

    const returnedData = await response.json();

    console.log('frontend data', returnedData);

    setData(returnedData);
  };

  let formattedBodyRows = null;

  if (data) {
    formattedBodyRows = data.data.map((row: any) => {
      let bgColor;
      if (row.type === 'INSCRIBE') {
        bgColor = 'green.100';
      }

      if (row.type === 'SEND') {
        bgColor = 'orange.100';
      }

      if (row.type === 'RECEIVE') {
        bgColor = 'blue.100';
      }
      return (
        <Tr bg={bgColor} key={row.txid}>
          <Td>{row.txid}</Td>
          <Td>{row.type}</Td>
          <Td>{row.inscription_id}</Td>
          <Td>{row.counterpart_address}</Td>
          <Td>{row.spent_as_fee ? 'True' : 'False'}</Td>
          <Td>{row.timestamp}</Td>
          <Td>{row.confirmed ? 'True' : 'False'}</Td>
        </Tr>
      );
    });
  }

  return (
    <VStack p={3} m={10}>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Enter Address'
        bg={'gray.100'}
        variant={'flushed'}
        width={'66%'}
        height='40px'
        borderRadius={'45'}
        type='text'
        fontSize={'26px'}
        textAlign={'center'}
        padding={10}
      />
      <Button
        size={'lg'}
        width={'33%'}
        height='60px'
        borderRadius={'45'}
        colorScheme='blue'
        onClick={search}
      >
        Search
      </Button>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Type</Th>
              <Th>Inscription ID</Th>
              <Th>Counterpart Address</Th>
              <Th>Spend as Fee</Th>
              <Th>Timestamp</Th>
              <Th>Confirmed</Th>
            </Tr>
          </Thead>
          <Tbody>{formattedBodyRows}</Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  );
}
