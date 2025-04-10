import React from 'react'
import { Button, Modal, ModalProps, Pressable, StyleSheet, Text, View } from 'react-native'
import { APPCOLORS } from '../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActionsButton } from '../utils/actionsButton';
import { Load } from '../interfaces/loadType';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustomModalProps extends ModalProps {
  openModal: boolean;
  toggleModal: () => void;
  load: Load

}
export const OfferModal =  ({ openModal, toggleModal, load }: CustomModalProps) => {

  return (
    <Modal visible={openModal} transparent={true} animationType='slide' style={{ flex: 1, width: '100%' }}>
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <View style={styles.container}>
          <Text style={[styles.modalTitle, { textAlign: 'center', fontSize: 30, marginBottom: 30, marginTop: 20 }]}>Oferta: </Text>
          <View>
            {/* Informacion de la carga - izquierda*/}
            <TextContainer title='Material: ' subtitle={load.material} />
            <TextContainer title='Lugar Carga: ' subtitle={load.ubicacionInicial} />
            <TextContainer title='Lugar Descarga: ' subtitle={load.ubicacionFinal}/>
            <TextContainer title='Presentación: ' subtitle={load.presentacion} />
            <TextContainer title='Valor: ' subtitle={`$ ${load.valorViaje}`} />
            <TextContainer title='Pago por: ' subtitle={load.formadepago} />
            <TextContainer title='Dador: ' subtitle={load.dador} />

          </View>
          {/* Botones accion */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30, marginTop:15, gap:30, marginRight: 20 }}>

            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly',  }}>
              <Pressable
                style={styles.filterBtn}
                onPress={()=> ActionsButton.actionWhatsappButton('123456789')}>
                <Ionicons name='logo-whatsapp' size={40} color={APPCOLORS.clearBackground} />
                <Text style={{ color: APPCOLORS.textWhite }}>Whatsapp</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
              <Pressable
                style={styles.filterBtn2}
                onPress={()=> ActionsButton.actionCallButton('123456789')}>
                <Ionicons name='call' size={40} color={APPCOLORS.clearBackground} />
                <Text style={{ color: APPCOLORS.textWhite }}>Llamar</Text>
              </Pressable>
            </View>
          </View>
          {/* Boton cerrar */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30, marginRight: 15 }}>
            <Pressable
              style={styles.filterBtnCancel}
              onPress={toggleModal}>
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 20, }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const TextContainer = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.modalTitle}>{title}</Text>
      <Text style={styles.modalSubtitle}>{subtitle}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8.30,
    elevation: 40,
    backgroundColor: '#ffffff',
    padding: 20,
    height: '90%',
    borderRadius: 30,
    borderWidth: 4,
    borderColor: APPCOLORS.secondary,
    margin: 20,
  },
  modalTitle: {
    marginHorizontal: 5,

    fontSize: 20,
    fontWeight: 'bold',
    color: APPCOLORS.primary
  },
  modalSubtitle: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: APPCOLORS.cuaternary
  },
  textContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: APPCOLORS.primary
  },
  filterBtn: {
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPCOLORS.whatsappBtn,
    borderRadius: 12,
    alignContent: 'center',
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtn2: {
    width: 80,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPCOLORS.primary,
    borderRadius: 12,
    alignContent: 'center',
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnCancel: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b51a25',
    borderRadius: 12,
    alignContent: 'center',
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnTitle: {
    fontSize: 14,
    color: APPCOLORS.textWhite,
    fontWeight: '500'
  },
})