import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import {
  Card,
  Chip,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import { Contact } from '../types/types';

interface ContactCardProps {
  member: Contact;
}

const ContactCard = ({ member }: ContactCardProps) => {
  const theme = useTheme();

  const handlePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };


  return (
    <Card
      style={[
        styles.contactCard,
        { backgroundColor: theme.colors.surface }
      ]}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.contactHeader}>
          <Chip
            compact
            style={[
              styles.roleChip,
              {
                borderColor: theme.colors.primary,
                backgroundColor: theme.colors.primaryContainer
              }
            ]}
            textStyle={{ color: theme.colors.onPrimaryContainer, fontSize: 12 }}
          >
            {member.role}
          </Chip>
          <Text
            variant="titleMedium"
            style={[styles.name, { color: theme.colors.onSurface }]}
          >
            {member.name}
          </Text>
        </View>

        <View style={[
          styles.phoneContainer,
          { backgroundColor: theme.colors.surfaceVariant }
        ]}>
          <IconButton
            icon="phone"
            iconColor={theme.colors.primary}
            size={18}
            onPress={() => handlePhoneCall(member.phone)}
            style={styles.phoneIcon}
          />
          <Text
            variant="bodyLarge"
            style={[styles.phoneNumber, { color: theme.colors.onSurface }]}
            onPress={() => handlePhoneCall(member.phone)}
          >
            {member.phone}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  contactCard: {
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    borderRadius: 12,
  },
  cardContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  roleChip: {
    borderRadius: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  phoneIcon: {
    margin: 0,
    marginRight: 8,
  },
  phoneNumber: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
});
