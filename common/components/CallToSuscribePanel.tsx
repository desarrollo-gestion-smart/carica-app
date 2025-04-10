import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

// Token de producción de tu cuenta de prueba
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_API_KEY;

const CallToSuscribePanel = ({ width }: { width: any }) => {
  const _handlePressButtonAsync = async () => {
    const preapprovalRequest = {
      reason: 'Carica',
      auto_recurring: {
        repetitions: 12,
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 100, // Monto bajo para pruebas (ajústalo si es producción)
        currency_id: 'ARS',
        
      },
      back_url: 'https://www.mercadopago.com',
      status: 'pending',
    };

    try {
      const response = await fetch('https://api.mercadopago.com/preapproval_plan', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preapprovalRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al crear el plan:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Plan creado:', data);

      if (data.init_point) {
        const result = await WebBrowser.openBrowserAsync(data.init_point);
        console.log('Resultado del navegador:', result);
      } else {
        console.log('No init_point en la respuesta');
      }
    } catch (error) {
      console.error('Error en la suscripción:', error);
    }
  };

  return (
    <View
      style={{
        width: width,
        height: 40,
        backgroundColor: 'orange',
        position: 'absolute',
        bottom: 65,
        justifyContent: 'center',
        alignSelf: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <TouchableOpacity onPress={_handlePressButtonAsync}>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Suscríbete para tener acceso a toda la app
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallToSuscribePanel;