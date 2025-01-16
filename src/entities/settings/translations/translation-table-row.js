import { Button, Table, TextInput } from '@mantine/core';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

import CategorySelect from './category-id-select';
import FileIdSelect from './file-id-select';

const TranslationTableRow = ({ item, toggle, setIds }) => {
  const [values, setValues] = useState(item);
  return (
    <Table.Tr>
      <Table.Td>{item.key}</Table.Td>
      <Table.Td>
        <div className='flex flex-col gap-2'>
          {item.values.map((value, index) => {
            return (
              <div className='flex gap-2 items-center w-full' key={value.id}>
                <div className='flex gap-2 items-center flex-1'>
                  <span className='uppercase'>{value.folder}</span>
                  <TextInput
                    className='w-full'
                    value={values.values[index].value}
                    onChange={(e) => {
                      const { value } = e.target;
                      const newValues = [...values.values];
                      newValues[index].value = value;
                      setValues({
                        ...values,
                        values: newValues,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Table.Td>
      <Table.Td>
        {values.file_id ? (
          <FileIdSelect setValues={setValues} values={values} />
        ) : (
          <span>File id mavjud emas</span>
        )}
      </Table.Td>
      <Table.Td>
        <CategorySelect setValues={setValues} values={values} />
      </Table.Td>
      <Table.Td>
        <div className='flex gap-2 items-center'>
          <SaveButton values={values} />
          <Button
            onClick={() => {
              setIds(values.values.map((item) => item.id));
              toggle();
            }}
          >
            Delete
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  );
};

const SaveButton = ({ values }) => {
  const { mutate } = useMutation();
  return (
    <Button
      onClick={() => {
        mutate(
          {
            url: '/admin/language-translate/update',
            data: values,
            method: 'PUT',
          },
          {
            onSuccess: () => {
              toast.success('Saved');
            },
            onError: (error) => {
              error.response?.data?.data?.map((item) => {
                toast.error(item.message);
              });
              if (!error.response?.data?.data?.length)
                toast.error(error.response?.data?.message || 'Something went wrong');
            },
          },
        );
      }}
    >
      Saqlash
    </Button>
  );
};

export default TranslationTableRow;
