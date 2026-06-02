"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileSchemaType } from "./_schemas/profileSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PrimaryButton from "@/components/PrimaryButton";

export default function PerfilFormClient() {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      cpf: "",
      rg: "",
      birthDate: "",
      phone: "",
      email: "",
      establishmentName: "",
      establishmentPhone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      specialties: "",
      bio: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;
  const bio = watch("bio") || "";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // estado para pré-visualização da imagem selecionada
  const [preview, setPreview] = useState<string | null>(null);
  // armazena o File selecionado para enviar metadados (type, size)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // faz upload do base64 para a rota /api/upload e retorna { url }
  async function uploadBase64Image(
    base64Data: string,
    filename: string,
    contentType?: string,
    size?: number,
  ) {
    const body: any = { filename, data: base64Data };
    if (contentType) body.contentType = contentType;
    if (size) body.size = size;

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Falha no upload da imagem");
    return res.json();
  }

  const [loading, setLoading] = useState(false);

  // Função de submissão: se houver imagem em `preview`, faz upload primeiro
  async function onSubmit(data: ProfileSchemaType) {
    setLoading(true);
    try {
      if (preview && preview.startsWith("data:")) {
        // separa metadata e base64
        const commaIndex = preview.indexOf(",");
        const base64 = preview.substring(commaIndex + 1);
        const metadata = preview.substring(0, commaIndex);
        const extMatch = metadata.match(/image\/(png|jpeg|jpg|webp)/);
        const ext = extMatch ? extMatch[1].replace("jpeg", "jpg") : "png";
        const filename = `avatar_${Date.now()}.${ext}`;
        // envia também tipo e tamanho (quando disponíveis) para validação no servidor
        const json = await uploadBase64Image(
          base64,
          filename,
          selectedFile?.type,
          selectedFile?.size,
        );
        // salva URL retornada no payload para ser persistida no Profile
        data.avatar = json.url;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const res = await fetch("/api/perfil", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Erro");
        toast.success("Perfil atualizado com sucesso", {
          position: "top-center",
        });
      } catch (err: any) {
        if (err?.name === "AbortError") {
          toast.error("Tempo de conexão excedido", { position: "top-center" });
        } else {
          console.error(err);
          toast.error("Erro ao atualizar perfil", { position: "top-center" });
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao atualizar perfil", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  // Handler para input file: lê o arquivo e seta `preview` como data URL
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de tipo e tamanho (limite: 2MB)
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (!allowed.includes(file.type)) {
      toast.error("Formato inválido. Use PNG, JPG ou WEBP.", {
        position: "top-center",
      });
      return;
    }
    if (file.size > maxSize) {
      toast.error("Arquivo muito grande. Máx 2MB.", { position: "top-center" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <div className="flex gap-6 items-center">
          <div className="w-28 h-28 rounded-md bg-amber-500 flex items-center justify-center text-2xl font-bold text-stone-900">
            {/* se houver preview, mostra a imagem, senão mostra placeholder */}
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              "JS"
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium text-white mb-1">
              Foto de Perfil
            </h2>
            <p className="text-sm text-stone-300">
              Faça upload de uma foto sua ou do seu estabelecimento. Formatos
              aceitos: JPG, PNG, WEBP.
            </p>
            <div className="mt-3 flex items-center gap-3">
              {/* input file escondido; botão aciona o seletor */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <PrimaryButton
                type="button"
                className="py-2 px-4"
                onClick={() => fileInputRef.current?.click()}
              >
                Selecionar foto
              </PrimaryButton>
              {preview && (
                <PrimaryButton
                  type="button"
                  className="py-2 px-4 bg-stone-700"
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Remover foto
                </PrimaryButton>
              )}
            </div>
            {/* mostra nome/tamanho do arquivo selecionado */}
            {selectedFile && (
              <div className="mt-2 text-sm text-stone-300">
                {selectedFile.name} — {(selectedFile.size / 1024).toFixed(0)} KB
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-4">
          Dados Pessoais
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("name")}
              placeholder="Nome completo"
              className="bg-stone-500/50"
            />
            {errors.name && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("cpf")}
              placeholder="CPF"
              className="bg-stone-500/50"
            />
            {errors.cpf && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.cpf.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("rg")}
              placeholder="RG"
              className="bg-stone-500/50"
            />
            {errors.rg && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.rg.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("birthDate")}
              placeholder="Data de nascimento"
              className="bg-stone-500/50"
            />
            {errors.birthDate && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.birthDate.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("phone")}
              placeholder="Telefone pessoal"
              className="bg-stone-500/50"
            />
            {errors.phone && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.phone.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              placeholder="E-mail"
              className="bg-stone-500/50"
            />
            {errors.email && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-4">
          Estabelecimento
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("establishmentName")}
              placeholder="Nome do estabelecimento"
              className="bg-stone-500/50"
            />
            {errors.establishmentName && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.establishmentName.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("establishmentPhone")}
              placeholder="Telefone do estabelecimento"
              className="bg-stone-500/50"
            />
            {errors.establishmentPhone && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.establishmentPhone.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("cep")}
              placeholder="CEP"
              className="bg-stone-500/50"
            />
            {errors.cep && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.cep.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("address")}
              placeholder="Logradouro"
              className="bg-stone-500/50"
            />
            {errors.address && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.address.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("number")}
              placeholder="Número"
              className="bg-stone-500/50"
            />
            {errors.number && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.number.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("complement")}
              placeholder="Complemento"
              className="bg-stone-500/50"
            />
            {errors.complement && (
              <p className="text-sm text-rose-400 mt-1">
                {errors.complement.message as string}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-2">
          Especialidades
        </h3>
        <p className="text-sm text-stone-300 mb-4">
          Adicione suas especialidades. Elas aparecem no seu perfil público.
        </p>
        <div className="flex gap-3">
          <Input
            {...register("specialties")}
            placeholder="Ex.: Corte degradê, Barba, Coloração..."
            className="bg-stone-500/50 rounded-md"
          />
          <PrimaryButton type="button" className="py-2 px-4">
            Adicionar
          </PrimaryButton>
        </div>
      </section>

      <section className="rounded-xl p-6 bg-stone-500/10 border border-white/10 backdrop-blur-lg shadow-lg">
        <h3 className="text-md font-semibold text-white mb-2">Sobre mim</h3>
        <label className="text-sm text-stone-300 mb-2 block">
          Descrição / Bio
        </label>
        <Textarea
          {...register("bio")}
          placeholder="Conte um pouco sobre você, sua experiência, diferenciais..."
          rows={6}
          className="bg-stone-500/50"
        />
        <div className="text-right text-sm text-stone-400 mt-2">
          {bio.length} / 500 caracteres
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <PrimaryButton
          type="submit"
          disabled={loading}
          className="w-1/2 py-3 bg-amber-500"
        >
          {loading ? "Salvando..." : "Salvar Perfil"}
        </PrimaryButton>
      </div>
    </form>
  );
}
