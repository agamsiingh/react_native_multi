import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  BasicInfo: undefined;
  AddressInfo: undefined;
  Summary: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type BasicInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'BasicInfo'>;
export type AddressInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'AddressInfo'>;
export type SummaryScreenProps = NativeStackScreenProps<RootStackParamList, 'Summary'>;
