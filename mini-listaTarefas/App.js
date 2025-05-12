import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

// Ativar animações no Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: 'Estudar para a prova', concluida: false },
    { id: 2, titulo: 'Fazer projeto de arte', concluida: true },
  ]);
  const [filtro, setFiltro] = useState('todas');
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (!novaTarefa.trim()) return;
    const nova = {
      id: Date.now(),
      titulo: novaTarefa,
      concluida: false,
    };
    LayoutAnimation.easeInEaseOut();
    setTarefas([...tarefas, nova]);
    setNovaTarefa('');
  };

  const marcarTarefa = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  };

  const excluirTarefa = (id) => {
    Alert.alert("Excluir tarefa", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim", onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setTarefas(tarefas.filter(t => t.id !== id));
        }
      }
    ]);
  };

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === 'concluidas') return tarefa.concluida;
    if (filtro === 'naoConcluidas') return !tarefa.concluida;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📋 Lista Interativa</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite uma nova tarefa"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          style={styles.input}
        />
        <Button title="Adicionar" onPress={adicionarTarefa} color="#5C6BC0" />
      </View>

      <View style={styles.filtros}>
        <Button title="Todas" onPress={() => setFiltro('todas')} color="#607D8B" />
        <Button title="Concluídas" onPress={() => setFiltro('concluidas')} color="#388E3C" />
        <Button title="Pendentes" onPress={() => setFiltro('naoConcluidas')} color="#F57C00" />
      </View>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => marcarTarefa(item.id)}
            onLongPress={() => excluirTarefa(item.id)}
            style={[
              styles.item,
              item.concluida ? styles.concluida : styles.naoConcluida,
            ]}
          >
            <Text style={styles.texto}>
              {item.concluida ? '✅' : '⬜'} {item.titulo}
            </Text>
            <Text style={styles.acao}>Toque p/ concluir, segure p/ excluir</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa encontrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3949AB',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#9FA8DA',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#EDE7F6',
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  item: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  concluida: {
    backgroundColor: '#D0F0FD',
    borderLeftWidth: 6,
    borderLeftColor: '#0288D1',
  },
  naoConcluida: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 6,
    borderLeftColor: '#FF9800',
  },
  texto: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  acao: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  vazio: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
    marginTop: 40,
  },
});

export default App;
