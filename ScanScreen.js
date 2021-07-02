import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state= {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
        }
    }


    getCameraPermissions= async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status === 'granted'
        })
    }


    handleBarCodeScanned = async({type,data}) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal',
        })
    }


    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner>
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                </BarCodeScanner>
            )
        }
        else if (buttonState === 'normal'){
        return(
            <View>
                <Text>{
                    hasCameraPermissions === true ? this.state.scannedData: "Request Camera Permission"
                }</Text>
                <TouchableOpacity
                    onPress={this.getCameraPermissions}
                    title = "Bar Code Scanner">
                    <Text> Scan QR Code </Text>
                </TouchableOpacity>
            </View>
        )
      }
    }
}


