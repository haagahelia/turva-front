import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Checkbox, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { briefingItems } from '../../../src/mockData';
import { useSafetyStore } from '../../../src/zustand/store';

export default function SafetyBriefing() {
  const theme = useTheme();
  const { completed, readCount, markCompleted, initializeReadCount } = useSafetyStore();

  // Initialize read count on component mount
  useEffect(() => {
    initializeReadCount();
  }, [initializeReadCount]);

  const handleItemPress = (itemId: string) => {
    // Navigate to safety-info with the item ID as parameter
    router.navigate(`/(tabs)/home/safety-info?itemId=${itemId}`);
  };

  const handleCheckmarkPress = (itemId: string, event: any) => {
    // Prevent navigation when clicking checkmark
    event.stopPropagation();
    const routeStr = `/(tabs)/home/safety-info?itemId=${itemId}`;
    markCompleted(routeStr);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            Turvallisuusperehdytys
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Valitse aihe tutustuaksesi turvallisuusohjeisiin
          </Text>
        </View>

        {/* Description */}
        <Card style={[styles.descriptionCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.descriptionText, { color: theme.colors.onSurface }]}>
              Haaga-Helia haluaa tarjota ja varmistaa korkeakouluyhteisöllemme turvallisen ja
              viihtyisän ympäristön opiskella ja työskennellä. Ympäristön, jossa on hyvä olla, 
              osallistua ja oppia.
            </Text>
            <View style={styles.progressContainer}>
              <MaterialCommunityIcons 
                name="chart-line" 
                size={20} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.progressText, { color: theme.colors.primary }]}>
                {readCount} / {briefingItems.length} suoritettu
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Briefing Items */}
        <View style={styles.itemsContainer}>
          {briefingItems.map((item) => {
            const routeStr = `/(tabs)/home/safety-info?itemId=${item.id}`;
            const isCompleted = completed.includes(routeStr);
            
            return (
              <Card 
                key={item.id} 
                style={[
                  styles.itemCard,
                  { 
                    backgroundColor: theme.colors.surface,
                    borderColor: isCompleted ? theme.colors.primary : theme.colors.outline,
                    borderWidth: 1
                  }
                ]}
              >
                <Card.Content style={styles.cardContent}>
                  <Button
                    mode="text"
                    onPress={() => handleItemPress(item.id)}
                    style={styles.itemButton}
                    contentStyle={styles.itemButtonContent}
                    labelStyle={[
                      styles.itemLabel, 
                      { color: theme.colors.onSurface }
                    ]}
                  >
                    <View style={styles.itemTextContainer}>
                      <Text style={[
                        styles.itemTitle, 
                        { 
                          color: isCompleted ? theme.colors.primary : theme.colors.onSurface 
                        }
                      ]}>
                        {item.title}
                      </Text>
                    </View>
                  </Button>
                  
                  
                    <Checkbox
                      status={isCompleted ? 'checked' : 'unchecked'}
                      onPress={(event) => handleCheckmarkPress(item.id, event)}
                      color={theme.colors.primary}
                    />
               
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  descriptionCard: {
    marginBottom: 24,
    elevation: 2,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  itemsContainer: {
    gap: 12,
  },
  itemCard: {
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemButton: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  itemButtonContent: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemShortTitle: {
    fontSize: 14,
  },

});