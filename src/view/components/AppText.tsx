import { Text, TextStyle } from "react-native";
import { appColors } from "../../constants/AppColors";
import React, { Children, useContext, useState } from "react";

interface TextProps {
    text: string;
    styles?: TextStyle;
    children?: React.ReactNode;
}

export const AppText: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ color: 'black', fontSize: 14, fontFamily: 'Inter_Regular' }, styles]}>{text}</Text>
    );
}
export const AppTextMid: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text numberOfLines={2} style={[{ color: 'black', fontSize: 14, fontFamily: 'Inter_Medium' }, styles]}>{text}</Text>
    );
}
export const AppTextBold: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ fontSize: 15, fontFamily: 'Inter_Medium' }, styles]}>{text}</Text>
    );
}
export const AppTextBolder: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ fontSize: 15, fontFamily: 'Inter_Bold' }, styles]}>{text}</Text>
    );
}
export const AppTextSmall: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ color: 'black', fontSize: 12, fontFamily: 'Inter_Regular' }, styles]}>{text}</Text>
    );
}
export const AppTextSmallB: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ color: 'black', fontSize: 12, fontFamily: 'Inter_Medium' }, styles]}>{text}</Text>
    );
}
export const AppGreySText: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ fontSize: 15, color: appColors.grey, fontFamily: 'Inter_Regular', fontWeight: 'regular' }, styles]}>{text}</Text>
    );
}
export const AppGreyMText: React.FC<TextProps> = ({ text, styles }) => {
    return (
        <Text style={[{ fontSize: 15.5, fontFamily: 'Inter_Regular' }, styles]}>{text}</Text>
    );
}
export const AppTextBig: React.FC<TextProps> = ({ text, styles, children }) => {
    return (
        <Text style={[{ fontSize: 39, fontFamily: 'Inter_Medium' }, styles]}>{text}{children}</Text>
    );
}