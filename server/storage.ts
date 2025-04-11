import { 
  users, 
  type User, 
  type InsertUser, 
  travelPreferences, 
  type TravelPreference, 
  type InsertTravelPreference, 
  itineraries, 
  type Itinerary, 
  type InsertItinerary, 
  conversations, 
  type Conversation, 
  type InsertConversation,
  type Message
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Travel Preferences methods
  getPreference(id: number): Promise<TravelPreference | undefined>;
  getUserPreferences(userId: number): Promise<TravelPreference[]>;
  createPreference(preference: InsertTravelPreference): Promise<TravelPreference>;
  updatePreference(id: number, preference: Partial<InsertTravelPreference>): Promise<TravelPreference | undefined>;
  
  // Itinerary methods
  getItinerary(id: number): Promise<Itinerary | undefined>;
  getUserItineraries(userId: number): Promise<Itinerary[]>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  
  // Conversation methods
  getConversation(id: number): Promise<Conversation | undefined>;
  getConversationByPreferenceId(preferenceId: number): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  addMessage(conversationId: number, message: Message): Promise<Conversation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private preferences: Map<number, TravelPreference>;
  private itineraries: Map<number, Itinerary>;
  private conversations: Map<number, Conversation>;
  
  currentUserId: number;
  currentPreferenceId: number;
  currentItineraryId: number;
  currentConversationId: number;

  constructor() {
    this.users = new Map();
    this.preferences = new Map();
    this.itineraries = new Map();
    this.conversations = new Map();
    
    this.currentUserId = 1;
    this.currentPreferenceId = 1;
    this.currentItineraryId = 1;
    this.currentConversationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Travel Preferences methods
  async getPreference(id: number): Promise<TravelPreference | undefined> {
    return this.preferences.get(id);
  }
  
  async getUserPreferences(userId: number): Promise<TravelPreference[]> {
    return Array.from(this.preferences.values()).filter(
      (preference) => preference.userId === userId
    );
  }
  
  async createPreference(insertPreference: InsertTravelPreference): Promise<TravelPreference> {
    const id = this.currentPreferenceId++;
    const preference: TravelPreference = { ...insertPreference, id, createdAt: new Date() };
    this.preferences.set(id, preference);
    return preference;
  }
  
  async updatePreference(id: number, preferenceUpdate: Partial<InsertTravelPreference>): Promise<TravelPreference | undefined> {
    const currentPreference = this.preferences.get(id);
    if (!currentPreference) return undefined;
    
    const updatedPreference = { ...currentPreference, ...preferenceUpdate };
    this.preferences.set(id, updatedPreference);
    return updatedPreference;
  }
  
  // Itinerary methods
  async getItinerary(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }
  
  async getUserItineraries(userId: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.userId === userId
    );
  }
  
  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = this.currentItineraryId++;
    const itinerary: Itinerary = { ...insertItinerary, id, createdAt: new Date() };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }
  
  // Conversation methods
  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }
  
  async getConversationByPreferenceId(preferenceId: number): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conversation) => conversation.preferenceId === preferenceId
    );
  }
  
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const conversation: Conversation = { ...insertConversation, id, createdAt: new Date() };
    this.conversations.set(id, conversation);
    return conversation;
  }
  
  async addMessage(conversationId: number, message: Message): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) return undefined;
    
    const updatedMessages = [...conversation.messages, message];
    const updatedConversation = { ...conversation, messages: updatedMessages };
    
    this.conversations.set(conversationId, updatedConversation);
    return updatedConversation;
  }
}

export const storage = new MemStorage();
