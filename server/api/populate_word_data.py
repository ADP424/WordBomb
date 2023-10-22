with open('server/api/new_word_data.sql', 'w') as word_data:

    # DROP AND CREATE TABLES
    word_data.write('DROP table if EXISTS Dictionaries CASCADE;\n')
    word_data.write('DROP table if EXISTS LetterPrompts CASCADE;\n\n')

    word_data.write('CREATE TABLE LetterPrompts (\n')
    word_data.write('\tname TEXT PRIMARY KEY NOT NULL,\n')
    word_data.write('\tprompt_list TEXT [] NOT NULL\n')
    word_data.write(');\n\n')

    word_data.write('CREATE TABLE Dictionaries (\n')
    word_data.write('\tname TEXT PRIMARY KEY NOT NULL,\n')
    word_data.write('\tword_list TEXT [] NOT NULL,\n')
    word_data.write('\tletter_prompts TEXT NOT NULL,\n')
    word_data.write('\tFOREIGN KEY (letter_prompts) REFERENCES LetterPrompts(name)\n')
    word_data.write(');\n\n\n\n')

    # INSERT SCRABBLE WORD PROMPTS
    word_data.write('INSERT INTO LetterPrompts\n')
    word_data.write('\tVALUES (\'Scrabble Word Prompts\', ARRAY [')
    
    with open("server/api/scrabble_word_prompts.txt", 'r') as prompt_file:
        word_list = prompt_file.readlines()
        for i in range(len(word_list)):

            if i < len(word_list) - 1:
                word_data.write('\'' + word_list[i].strip() + '\',')
            else:
                word_data.write('\'' + word_list[i].strip() + '\'')
    
    word_data.write(']);\n\n\n\n')

    # INSERT SCRABBLE DICTIONARY
    word_data.write('INSERT INTO Dictionaries\n')
    word_data.write('\tVALUES (\'Scrabble Dictionary\', ARRAY [')
    
    with open("server/api/scrabble.txt", 'r') as scrabble_file:
        word_list = scrabble_file.readlines()
        for i in range(len(word_list)):

            if i < len(word_list) - 1:
                word_data.write('\'' + word_list[i].strip() + '\',')
            else:
                word_data.write('\'' + word_list[i].strip() + '\'')
    
    word_data.write('], \'Scrabble Word Prompts\');\n\n\n\n')