import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface PaymentFormData {
  recipient: string;
  amount: string;
  note?: string;
}

const schema = Yup.object().shape({
  recipient: Yup.string().required('Recipient is required'),
  amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
  note: Yup.string().optional(),
});

const PaymentForm: React.FC<{ onSubmit: (data: PaymentFormData) => void }> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Text>Recipient:</Text>
      <Controller
        control={control}
        name="recipient"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter recipient"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.recipient && <Text style={styles.error}>{errors.recipient.message}</Text>}

      <Text>Amount:</Text>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.amount && <Text style={styles.error}>{errors.amount.message}</Text>}

      <Text>Note (Optional):</Text>
      <Controller
        control={control}
        name="note"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Add a note"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PaymentForm;
